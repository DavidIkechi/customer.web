from typing import List, Union, Optional
from fastapi import Depends, FastAPI, UploadFile, File, status, HTTPException, Form, Query
from fastapi.middleware.cors import CORSMiddleware

from routers.score import score_count
import uvicorn
from routers.transcribe import transcript_router
from routers.users import user_router
from routers.orders import order_router
from routers.audios import audio_router
from routers.sentiment import sentiment_router
from routers.analyze import analyze_router
from routers.score import score_count
import models, json
from auth import get_active_user, get_current_user, get_admin

from authlib.integrations.starlette_client import OAuth
from authlib.integrations.starlette_client import OAuthError
from fastapi import FastAPI
from fastapi import Request
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse
from starlette.responses import RedirectResponse


from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from db import Base, engine, SessionLocal
from sqlalchemy.orm import Session
import crud, schema
from emails import send_email, verify_token, send_password_reset_email, password_verif_token
from starlette.requests import Request
import fastapi as _fastapi
from routers.agent import agent_router
import cloudinary
import cloudinary.uploader
from BitlyAPI import shorten_urls
import services as _services

from datetime import datetime, timedelta, date
from fastapi_utils.tasks import repeat_every


import shutil
import os

from dotenv import load_dotenv

from starlette.responses import FileResponse
from starlette.requests import Request
from starlette.responses import Response
import boto3, io
import uuid
import random, string 
from elasticapm.contrib.starlette import make_apm_client, ElasticAPM
import cron_status

apm_config = {
    'SERVICE_NAME': 'Heed_api',
    'SERVER_URL': 'http://localhost:8200',
    'ENVIRONMENT': 'production',
    'GLOBAL_LABELS': 'platform=DemoPlatform, application=DemoApplication'
}
# apm = make_apm_client(apm_config)

load_dotenv()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


description = """
Heed API helps you analyse sentiments in your customer support calls
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
    title="Heed API",
    description=description,
    version="0.0.1",
    openapi_tags=tags_metadata,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

app.include_router(
    transcript_router
    )

app.include_router(
    user_router
    )

app.include_router(
    order_router
    )

app.include_router(
    audio_router
)

app.include_router(
    agent_router
)

app.include_router(
    sentiment_router
)

app.include_router(
    analyze_router
)

# app.add_middleware(ElasticAPM, client=apm)

origins = [
    "http://localhost",
    "http://localhost:80",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:1111",
    "http://localhost:8000",
    "http://heed.hng.tech",
    "https://heed.hng.tech",
    "https://heed.hng.tech:80",
    "https://heed.hng.tech:3000",
    "https://heed.hng.tech:5173",
    "https://heed.hng.tech:1111",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OAuth settings
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID') or None
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET') or None
if GOOGLE_CLIENT_ID is None or GOOGLE_CLIENT_SECRET is None:
    raise BaseException('Missing env variables')

# Set up OAuth
config_data = {'GOOGLE_CLIENT_ID': GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_SECRET': GOOGLE_CLIENT_SECRET}
starlette_config = Config(environ=config_data)
oauth = OAuth(starlette_config)
oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

# Set up the middleware to read the request session
SECRET_KEY = os.getenv('SECRET_KEY') or None
if SECRET_KEY is None:
    raise BaseException('Missing SECRET_KEY')
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)



def main() -> None:
    uvicorn.run(
        "main:app", 
        host=os.getenv("HOST"), 
        port=int(os.getenv("PORT")), 
        reload=os.getenv("RELOAD")
    )

AWS_KEY_ID = os.getenv("AWS_KEY_ID")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")

# @app.on_event('startup')
# @repeat_every(seconds = 3, wait_first = True)
# def periodic():
#     cron_status.check_and_update_jobs()
    

@app.get("/")
async def ping():
    return {"message": "Heed Up"}

if __name__ == "__main__":
    main()