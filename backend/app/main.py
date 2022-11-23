from fastapi import Depends, FastAPI, UploadFile, File, status, HTTPException, Form
from routers.sentiment import sentiment
from routers.transcribe import transcribe_file
import models
from jwt import (
    main_login
)
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from db import Base, engine, SessionLocal
from sqlalchemy.orm import Session
import crud, schema

from emails import send_email, verify_token
from starlette.requests import Request
import fastapi as _fastapi
from auth import get_current_user

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
async def new_analyse(first_name: str = Form(), last_name: str = Form(), db: Session = Depends(get_db), file: UploadFile=File(...), user: models.User = Depends(get_current_user)):

    # Create Agent
    user_id = user.id
    company_id = user.company_id
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

    transcript = transcribe_file(file.filename)
    transcript = transcript

    sentiment_result = sentiment(transcript)
    negativity_score = sentiment_result['negativity_score']
    positivity_score = sentiment_result['positivity_score']
    neutrality_score = sentiment_result['neutrality_score']
    overall_sentiment = sentiment_result['overall_sentiment']

    db_audio = models.Audio(audio_path=file.filename, transcript=transcript, positivity_score=positivity_score, negativity_score=negativity_score, neutrality_score=neutrality_score, overall_sentiment=overall_sentiment, agent_id=db_agent.id)

    db.add(db_audio)
    db.commit()

    return {"transcript": transcript, "sentiment_result": sentiment_result}


# create the endpoint
@app.post('/login', summary = "create access token for logged in user", tags=['users'])
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # return token once the user has been successfully authenticated, or it returns an error.
    return await main_login(form_data, db)

@app.post("/users/", response_model=schema.User, tags=['users'])
async def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)

    await send_email([user.email], user)

    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schema.User], tags=['users'])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schema.User, tags=['users'])
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user




@app.get('/verification')
async def email_verification(request: Request, token: str, db: Session = Depends(get_db)):

    user = await verify_token(token, db)


    if user and not user.is_active:
        user.is_active = True
        db.commit()
        return{
            "status" : "ok",
            "data" : f"Hello {user.first_name}, your account has been successfully verified"}

@app.patch("/user/update/{user_id}", response_model=schema.user_update)
def update_user(user: schema.user_update, user_id: int, db:Session=_fastapi.Depends(get_db)):
     return crud.update_user(db=db, user=user, user_id=user_id)
