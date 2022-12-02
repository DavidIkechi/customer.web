from typing import List
from models import Audio
from fastapi import Depends, FastAPI, UploadFile, File, status, HTTPException, Form, Query
from fastapi_pagination import Page, paginate, Params
from fastapi.middleware.cors import CORSMiddleware
from routers.sentiment import sentiment
from routers.transcribe import transcribe_file
import auth
from routers.score import score_count
import uvicorn
from routers.transcribe import transcript_router
from routers.score import score_count
import models, json
from auth import get_active_user, get_current_user, get_admin
from jwt import (
    main_login

)

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from db import Base, engine, SessionLocal
from sqlalchemy.orm import Session
import crud, schema

from emails import send_email, verify_token, send_password_reset_email
from audio import audio_details
from starlette.requests import Request
import fastapi as _fastapi
import cloudinary
import cloudinary.uploader
from BitlyAPI import shorten_urls

from datetime import datetime


import shutil
import os

from dotenv import load_dotenv

load_dotenv()


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
    "https://heed.hng.tech",
    "http://heed.hng.tech",
    "https://heed.hng.tech:80",
    "https://heed.hng.tech:3000",
    "https://heed.hng.tech:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def main() -> None:
    uvicorn.run(
        "main:app", 
        host=os.getenv("HOST"), 
        port=int(os.getenv("PORT")), 
        reload=os.getenv("RELOAD")
    )


@app.get("/")
async def ping():
    return {"message": "Scrybe Up"}


@app.post("/upload_audios", tags=['analyse'])
async def analyse(first_name: str = Form(), last_name: str = Form(), db: Session = Depends(get_db), file: UploadFile=File(...), user: models.User = Depends(get_active_user)):
    
    user_id = user.id
    company_id = user.company_id
    
    # convert to lower case for both first and last name.    
    first_name = first_name.lower()
    last_name = last_name.lower()
    agent_name = "%s %s" %(first_name, last_name)
    
    # if the agent name is already in the database before creating for the agent.
    if not db.query(models.Agent).filter(models.Agent.first_name == first_name, 
                                     models.Agent.last_name == last_name).first():
        db_agent = models.Agent(first_name=first_name, last_name=last_name, company_id=company_id)
        # Add Agent
        db.add(db_agent)
        db.commit()
        db.refresh(db_agent)
    else:
        db_agent = db.query(models.Agent).filter(models.Agent.first_name == first_name, 
                                     models.Agent.last_name == last_name).first()
    try:
        contents = file.file.read()
        with open(file.filename, 'wb') as f:
            f.write(contents)
    except Exception:
        return {"error": "There was an error uploading the file"}
    finally:
        file.file.close()
    
    try:
        result = cloudinary.uploader.upload(file.filename, resource_type = "auto")
        url = result.get("url")
        urls = [url]
        response = shorten_urls(urls)
        retrieve_url = response[0]
        new_url = retrieve_url.short_url
        
    except Exception:
        return {"error": "There was an error uploading the file"}
    # transcript = transcript
    
    size = audio_details(file.filename)["size"]
    duration = audio_details(file.filename)["mins"]
    transcript = transcribe_file(new_url)
    # get some essential parameters
    audio_url = transcript['audio_url']
    job_status = transcript['status']
    transcript_id = transcript['id']
    
    db_audio = models.Audio(audio_path=audio_url, job_id = transcript_id, user_id=user_id, size=size, duration=duration, 
                            agent_id=db_agent.id)

    db.add(db_audio)
    db.commit()
    db.refresh(db_audio)
    
    # get the audio id and some details from the audio table.
    aud_details = db.query(models.Audio).filter(models.Audio.job_id == transcript_id).first()
    audio_id = aud_details.id
    
    # update the Agent table.
    db_agent = db.query(models.Agent).filter(models.Agent.first_name == first_name, 
                                     models.Agent.last_name == last_name).first()
    db_agent.aud_id = audio_id
    db.commit()
    
    # create the Job Table as well.
    db_job = models.Job(job_status=job_status, audio_id = audio_id)

    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    # delete the file
    os.remove(file.filename)

    
    return {
        "id":audio_id,
        "transcript_id": transcript_id
    }

# create the endpoint
@app.post('/login', summary = "create access token for logged in user", tags=['users'])
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # return token once the user has been successfully authenticated, or it returns an error.
    return await main_login(form_data, db)


@app.post("/create_users", summary = "create/register a user", response_model=schema.User, tags=['users'])
async def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)

    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    await send_email([user.email], user)
    return crud.create_user(db=db, user=user)


@app.get("/get_all_users", summary = "get all users", response_model=list[schema.User], tags=['users'])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/get_user/{user_id}", summary = "get user by id", response_model=schema.User, tags=['users'])
def read_user(user_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_admin)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user


@app.get('/verification', summary = "verify a user by email", tags=['users'])
async def email_verification(request: Request, token: str, db: Session = Depends(get_db)):

    user = await verify_token(token, db)


    if user and not user.is_active:
        user.is_active = True
        user.is_verified = True
        db.commit()
        return{
            "status" : "ok",
            "data" : f"Hello {user.first_name}, your account has been successfully verified"}

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

#get total analysis
@app.get("/total-analysis", summary="get user total analysis", response_model = schema.TotalAnalysis)
def get_total_analysis(db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    overall_sentiment = db.query(models.Audio).filter(models.Audio.user_id == user.id)
    week = datetime.now().isocalendar().week
    month = datetime.now().month
    list_month=[]
    list_week=[]
    week_item={}
    month_item={}
    result = dict()
    for i in overall_sentiment:
        if i.timestamp.month == month:
            list_month.append(i.overall_sentiment)
        if i.timestamp.isocalendar().week == week:
            list_week.append(i.overall_sentiment)


    week_item['id'] = 1
    week_item['positive'] = list_week.count("Positive")
    week_item['neutral'] = list_week.count("Neutral")
    week_item['negative'] = list_week.count("Negative")

    month_item['id'] = 1
    month_item['positive'] = list_month.count("Positive")
    month_item['neutral'] = list_month.count("Neutral")
    month_item['negative'] = list_month.count("Negative")

    result['week'] = [week_item]
    result['month'] = [month_item]

    return result

#total-recordings
@app.get("/total-recordings-user", summary="get total user recordings")
def total_recordings_user(db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    total_recordings = db.query(models.Audio).filter(models.Audio.user_id == user.id)
    week = datetime.now().isocalendar().week
    month = datetime.now().month
    results = {
        "week": [
            {"id": 1, "time": "M", "totalRecordings": 0},
            {"id": 2, "time": "T", "totalRecordings": 0},
            {"id": 3, "time": "W", "totalRecordings": 0},
            {"id": 4, "time": "T", "totalRecordings": 0},
            {"id": 5, "time": "F", "totalRecordings": 0},
            {"id": 6, "time": "S", "totalRecordings": 0},
            {"id": 7, "time": "S", "totalRecordings": 0}
        ],
        "month": [
            {"id": 1, "time": "wk1", "totalRecordings": 0},
            {"id": 2, "time": "wk2", "totalRecordings": 0},
            {"id": 3, "time": "wk3", "totalRecordings": 0},
            {"id": 4, "time": "wk4", "totalRecordings": 0}
        ]
    }
    for i in total_recordings:
        if i.timestamp.isocalendar().week == week:
            if i.timestamp.weekday() == 0:
                results["week"][0]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 1:
                results["week"][1]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 2:
                results["week"][2]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 3:
                results["week"][3]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 4:
                results["week"][4]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 5:
                results["week"][5]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 6:
                results["week"][6]["totalRecordings"] += 1

        if i.timestamp.month == month:
            if i.timestamp.day <= 7:
                results["month"][0]["totalRecordings"] += 1
            elif 8 <= i.timestamp.day <= 14:
                results["month"][1]["totalRecordings"] += 1
            elif 15 <= i.timestamp.day <= 21:
                results["month"][2]["totalRecordings"] += 1
            elif 22 <= i.timestamp.day <= 31:
                results["month"][3]["totalRecordings"] += 1

    return results


@app.get("/leaderboard", summary = "get agent leaderboard", tags=['agent leaderboard'])
def get_agents_leaderboard(db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    results = db.execute("""SELECT agent_id,
        agent_firstname,
        agent_lastname,
        SUM(CASE WHEN overall_sentiment= 'Positive' THEN 1 ELSE 0 END) AS Positive_score,
        SUM(CASE WHEN overall_sentiment= 'Negative' THEN 1 ELSE 0 END) AS Negative_score,
        SUM(CASE WHEN overall_sentiment= 'Neutral' THEN 1 ELSE 0 END) AS Neutral_score,
        round(positivity_score/(positivity_score+negativity_score+neutrality_score) * 10, 2) AS Avergae_score
    FROM audios GROUP BY agent_id
    ORDER BY Positive_score DESC""")
    leaderboard = [dict(r) for r in results]
    top3_agents = leaderboard[:3]
    others = leaderboard[3:]
    return {"Top3 Agents": top3_agents, "Other Agents": others}

#agent total_analysis
@app.get("/total-agent-analysis", summary="get total agent analysis")
def get_total_agent_analysis(agent_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    total_analysis = db.query(models.Audio).filter(models.Audio.user_id == user.id, models.Audio.agent_id == agent_id)
    week = datetime.now().isocalendar().week
    list_week=[]
    week_item={}
    result = {
        "week": [
            {"id": 1, "time": "Day 1", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 2, "time": "Day 2", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 3, "time": "Day 3", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 4, "time": "Day 4", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 5, "time": "Day 5", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 6, "time": "Day 6", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 7, "time": "Day 7", "positive": 0, "negative": 0, "neutral": 0}
        ],
    }
    for i in total_analysis:
        if i.timestamp.isocalendar().week == week:
            for y in range(7):
                if i.timestamp.weekday() == y:
                    if i.overall_sentiment == "Positive":
                        result["week"][y]["positive"] += 1
                    elif i.overall_sentiment == "Negative":
                        result["week"][y]["negative"] += 1
                    elif i.overall_sentiment == "Neutral":
                        result["week"][y]["neutral"] += 1

    return result


@app.get("/account", summary = "get user profile details", tags=['users'])
async def my_profile (db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    user_id = user.id
    return crud.get_user_profile(db, user_id)


@app.post("/forgot_password", tags=['users'])
async def forgot_password(email: str, db: Session = Depends(get_db)):
    user_exist = crud.get_user_by_email(db, email)
    if not user_exist:
        raise HTTPException(status_code=404, detail="User not Found")
    #if not user_exist.is_verified:
        #raise HTTPException(status_code=404, detail="You need to be verified to reset your password!!!")
    token = await send_password_reset_email([user_exist.email], user_exist)
    return token
    

if __name__ == "__main__":
    main()



@app.post("/agent", tags=['create agent'])
async def create_agent(agent: schema.AgentCreate, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    company_id = user.company_id
    return crud.create_agent(db, agent, company_id)

#delete single and multiple audios
@app.delete("/audios/delete")
def delete_audios(audios: List[int] = Query(None), db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    deleted_audios = []
    for audio_id in audios:
        db_audio = crud.get_audio(db, audio_id=audio_id)
        if db_audio:
            db.delete(db_audio)
            db.commit()
            deleted_audios.append(db_audio.audio_path)
    return {"message": "operation successful", "deleted audion(s)": deleted_audios}
            