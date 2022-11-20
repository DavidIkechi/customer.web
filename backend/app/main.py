from fastapi import Depends, FastAPI, UploadFile, File, status, HTTPException, Request
from routers.sentiment import sentiment
from routers.transcribe import transcribe_file
import models
# from jwt import (
#     main_login
# )
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from db import Base, engine, SessionLocal
from sqlalchemy.orm import Session
import crud, schema

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

# database.
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

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
    sentiment_result = sentiment(transcript)
    return {"transcript": transcript, "sentiment_result": sentiment_result}

# create the endpoint
@app.post('/login', summary = "create access token for logged in user")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    # return token once the user has been successfully authenticated, or it returns an error.
    return await main_login(form_data, session)

# # create the endpoint
# @app.post('/login', summary = "create access token for logged in user")
# async def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
#     # return token once the user has been successfully authenticated, or it returns an error.
#     return await main_login(form_data, session)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schema.User, tags=['users'])
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
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

@app.get("/sentiment_analysis")
async def get_sentiment_analysis_result(request: Request):
    await analyse()
    transcript = request.transcript
    sentiment_result= request.sentiment_result
    return {"Transcript": transcript, "Sentiment": sentiment_result} 
    
