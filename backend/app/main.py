
from fastapi import Depends, FastAPI, UploadFile, File, status, HTTPException, Form
from fastapi_pagination import Page, paginate, Params
from fastapi.middleware.cors import CORSMiddleware
from routers.sentiment import sentiment
from routers.transcribe import transcribe_file
import auth
from routers.score import score_count

from routers.transcribe import transcript_router
from routers.score import score_count
import models, json
from auth import get_active_user, get_current_user
from jwt import (
    main_login
    )
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from db import Base, engine, SessionLocal
from sqlalchemy.orm import Session
import crud, schema
from emails import send_email, verify_token
from audio import audio_details
from starlette.requests import Request
import fastapi as _fastapi

import shutil
import os


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


description = """
Scrybe API helps you analyse sentiments in your customer support calls
"""

tags_metadata = [
    {
        "name": "analyse",
        "description": "Analyse audio calls for sentiment.",
    },
    {
        "name": "users",
        "description": "CRUD User Endpoints",
    },
]

# create the database.
models.Base.metadata.create_all(engine)


app = FastAPI(
    title="Scrybe API",
    description=description,
    version="0.0.1",
    openapi_tags=tags_metadata,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

app.include_router(transcript_router)

origins = [
    "http://localhost",
    "http://localhost:80",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8000",
    "https://scrybe.hng.tech",
    "https://scrybe.hng.tech:80",
    "https://scrybe.hng.tech:3000",
    "https://scrybe.hng.tech:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def ping():
    return {"message": "Scrybe Up"}


@app.post("/analyse", tags=['analyse'])
async def analyse(file: UploadFile=File(...)):
    try:
        contents = file.file.read()
        with open(file.filename, 'wb') as f:
            f.write(contents)
    except Exception:
        return {"error": "There was an error uploading the file"}
    finally:
        file.file.close()

    transcript = transcribe_file(file.filename)
    transcript = transcript

    sentiment_result = sentiment(transcript)

    negativity_score = sentiment_result['negativity_score']
    positivity_score = sentiment_result['positivity_score']
    neutrality_score = sentiment_result['neutrality_score']
    overall_sentiment = sentiment_result['overall_sentiment']


    return {"transcript": transcript, "sentiment_result": sentiment_result}


@app.post("/new_analyse", tags=['analyse'])
async def new_analyse(first_name: str = Form(), last_name: str = Form(), db: Session = Depends(get_db), file: UploadFile=File(...), user: models.User = Depends(get_active_user)):

    # Create Agent
    user_id = user.id
    company_id = user.company_id
    agent_name = "%s %s" %(first_name, last_name)
    db_agent = models.Agent(first_name=first_name, last_name=last_name, company_id=company_id)

    # Add Agent
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)

    try:
        contents = file.file.read()
        with open(file.filename, 'wb') as f:
            f.write(contents)
    except Exception:
        return {"error": "There was an error uploading the file"}
    finally:
        file.file.close()

    size = audio_details(file.filename)["size"]
    duration = audio_details(file.filename)["mins"]
    transcript = transcribe_file(file.filename)
    transcript = transcript

    sentiment_result = sentiment(transcript)

    negativity_score = sentiment_result['negativity_score']
    positivity_score = sentiment_result['positivity_score']
    neutrality_score = sentiment_result['neutrality_score']
    overall_sentiment = sentiment_result['overall_sentiment']
    most_negative_sentences = sentiment_result['most_negative_sentences']
    most_positive_sentences = sentiment_result ['most_postive_sentences']

    db_audio = models.Audio(audio_path=file.filename, user_id=user_id, size=size, duration=duration, transcript=transcript, positivity_score=positivity_score, negativity_score=negativity_score, neutrality_score=neutrality_score, overall_sentiment=overall_sentiment, most_negative_sentences = most_negative_sentences, most_positive_sentences = most_positive_sentences, agent_id=db_agent.id)

    db.add(db_audio)
    db.commit()
    db.refresh(db_audio)

    history_create: schema.HistoryCreate = {"user_id":user_id,
                                            "sentiment_result":overall_sentiment,
                                            "agent_name": agent_name,
                                            "audio_name": file.filename}

    crud.create_history(db, history_create)

    return {"transcript": transcript, "sentiment_result": sentiment_result}


# create the endpoint
@app.post('/login', summary = "create access token for logged in user", tags=['users'])
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # return token once the user has been successfully authenticated, or it returns an error.
    return await main_login(form_data, db)


@app.post("/users", summary = "create/register a user", response_model=schema.User, tags=['users'])
async def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)

    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    await send_email([user.email], user)
    return crud.create_user(db=db, user=user)


@app.get("/users", summary = "get all users", response_model=list[schema.User], tags=['users'])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", summary = "get user by id", response_model=schema.User, tags=['users'])
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user


@app.get('/verification', summary = "verify a user by email", tags=['users'])
async def email_verification(request: Request, token: str, db: Session = Depends(get_db)):

    user = await verify_token(token, db)


    if user and not user.is_active:
        user.is_active = True
        db.commit()
        return{
            "status" : "ok",
            "data" : f"Hello {user.first_name}, your account has been successfully verified"}


@app.patch("/user/update/{user_id}", summary = "update user details", response_model=schema.user_update, tags=['users'])
def update_user(user: schema.user_update, user_id: int, db:Session=_fastapi.Depends(get_db)):
     return crud.update_user(db=db, user=user, user_id=user_id)

@app.post("/tryForFree")
async def free_trial(file: UploadFile = File(...)):
    ####### saving the audio file
    with open(f'{file.filename}', "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    fileSize = 5242880
    getSize = os.path.getsize(file.filename)
    ###### transcribing the file
    if not file:
        raise HTTPException(status_code = 406, detail="No File Selected")
    elif getSize > fileSize :
        raise HTTPException(status_code = 406, detail="File Must Not Be More Than 5MB")
    else:
        ######### Load audio file
        transcript = transcribe_file(file.filename)
        transcript = transcript
        return{"transcript": transcript}




@app.get('/history', summary = "get user history", response_model=Page[schema.History])
async def get_history(user: models.User = Depends(get_current_user), db: Session = Depends(get_db), params: Params = Depends()):
    user_history = paginate(crud.get_history_by_user_id(db, user.id), params)
    if not user_history:
            raise HTTPException(
            status_code=404,
            detail="The user's history doesn't exist",
        )
    return user_history


@app.get("/new_analysis/{id}", summary = "get result of a sentiment analysis", response_model=schema.Analysis, tags=['analysis'])
def get_sentiment_result(id: int, db: Session = Depends(get_db)):
    """
    Get single analysis
    """
    analysis = crud.get_analysis(db, id)
    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="The analysis doesn't exist",
        )
    return analysis


@app.get("/audios", summary = "get all audio uploads", response_model=list[schema.Audio], tags=['audios'])
def read_audios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    audios = crud.get_audios(db, skip=skip, limit=limit)
    return audios


@app.get('/audios/{audio_id}/sentiment')
def read_sentiment(audio_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    db_audio = crud.get_audio(db, audio_id=audio_id)
    if db_audio is None:
        raise HTTPException(status_code=404, detail="Sentiment does not exist")
    else:
        positivity_score = float(db_audio.positivity_score)
        negativity_score = float(db_audio.negativity_score)
        neutrality_score = float(db_audio.neutrality_score)
        overall_sentiment = str(db_audio.overall_sentiment)
        most_positive_sentences = json.loads(db_audio. most_positive_sentences)
        most_negative_sentences = json.loads(db_audio. most_negative_sentences)
        transcript = db_audio.transcript
    sentiment = {"transcript": transcript,
                 "positivity_score": positivity_score,
                 "negativity_score": negativity_score,
                 "neutrality_score": neutrality_score,
                 "overall_sentiment": overall_sentiment,
                 "most_positive_sentences": most_positive_sentences,
                 "most_negative_sentences": most_negative_sentences,
                 }
    return sentiment


#get recent recordings
@app.get("/recent-recordings", summary = "get user recent recording upload", response_model=list[schema.Recordings])
def get_recent_recordings(skip: int = 0, limit: int = 5, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    recordings = db.query(models.Audio).filter(models.Audio.user_id == user.id).order_by(models.Audio.timestamp.desc()).offset(skip).limit(limit).all()
    return recordings


@app.get("/leaderboard", summary = "get agent leaderboard", tags=['agent leaderboard'])
def get_agents_leaderboard(db: Session = Depends(get_db)):
    results = db.execute("""SELECT agent_id,
        SUM(CASE WHEN overall_sentiment= 'Positive' THEN 1 ELSE 0 END) AS Positive_score,
        SUM(CASE WHEN overall_sentiment= 'Negative' THEN 1 ELSE 0 END) AS Negative_score,
        SUM(CASE WHEN overall_sentiment= 'Neutral' THEN 1 ELSE 0 END) AS Neutral_score,
        (positivity_score/(positivity_score+negativity_score+neutrality_score) * 10) AS Avergae_score
    FROM audios GROUP BY agent_id
    ORDER BY Positive_score DESC""")
    leaderboard = [dict(r) for r in results]
    return {"Agents Leaderboard": leaderboard}


@app.get("/account", summary = "get user profile details", tags=['users'])
async def my_profile (db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    user_id = user.id
    return crud.get_user_profile(db, user_id)

