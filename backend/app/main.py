from fastapi import Depends, FastAPI, UploadFile, File, status, HTTPException
from routers.sentiment import sentiment
from routers.transcribe import transcribe_file
import models
# from jwt import (
#     main_login
# )
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

# from db import Base, engine, SessionLocal
# from sqlalchemy.orm import Session

description = """
Scrybe API helps you analyse sentiments in your customer support calls
"""

tags_metadata = [
    {
        "name": "upload",
        "description": "Analyse audio calls for sentiment.",
    },
]

# create the database.
# Base.metadata.create_all(engine)

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


@app.post("/upload", tags=['analyse'])
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

# # create the endpoint
# @app.post('/login', summary = "create access token for logged in user")
# async def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
#     # return token once the user has been successfully authenticated, or it returns an error.
#     return await main_login(form_data, session)
