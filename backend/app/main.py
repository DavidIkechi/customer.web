from typing import List, Union, Optional
from pyngrok import ngrok
from fastapi import Depends, FastAPI, UploadFile, File, status, HTTPException, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from rocketry import Rocketry
from rocketry.conds import (
    every, hourly, daily,
    after_success,
    true, false
)
import logging

import asyncio
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

from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse
from starlette.responses import RedirectResponse


from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from db import Base, engine, SessionLocal
from sqlalchemy.orm import Session
import crud, schema
from emails import send_email, verify_token, send_password_reset_email, password_verif_token, transcription_result_email
from audio import audio_details
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
from scheduler import cron_schedule as cron_rocketry

import ssl
from pyngrok import ngrok, conf, installer

# pyngrok_config = conf.get_default()

# if not os.path.exists(pyngrok_config.ngrok_path):
#     myssl = ssl.create_default_context();
#     myssl.check_hostname=False
#     myssl.verify_mode=ssl.CERT_NONE
#     installer.install_ngrok(pyngrok_config.ngrok_path, context=myssl)

# public_url = ngrok.connect(3210).public_url

# print(public_url)
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
# Open a SSH tunnel
# <NgrokTunnel: "tcp://0.tcp.ngrok.io:12345" -> "localhost:22">

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
    "https://www.heed.cx:80",
    "https://www.heed.cx:3000",
    "https://www.heed.cx:5173",
    "https://www.heed.cx:1111",
    "http://www.heed.cx",
    "https://www.heed.cx",
    "https://heed.cx:80",
    "https://heed.cx:3000",
    "https://heed.cx:5173",
    "https://heed.cx:1111",
    "http://heed.cx",
    "https://heed.cx",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Set up the middleware to read the request session
SECRET_KEY = os.getenv('SECRET_KEY') or None
if SECRET_KEY is None:
    raise BaseException('Missing SECRET_KEY')
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)



class Server(uvicorn.Server):
    """Customized uvicorn.Server
    
    Uvicorn server overrides signals and we need to include
    Rocketry to the signals."""
    def handle_exit(self, sig: int, frame) -> None:
        cron_rocketry.session.shut_down()
        return super().handle_exit(sig, frame)


async def main() -> None:
    server = Server(uvicorn.Config(
        "main:app", 
        host=os.getenv("HOST"), 
        port=int(os.getenv("PORT")), 
        reload=os.getenv("RELOAD"),
        workers=1, 
        loop="asyncio")
    )
    
    api = asyncio.create_task(server.serve())
    sched = asyncio.create_task(cron_rocketry.serve())
    await asyncio.wait([sched, api])

AWS_KEY_ID = os.getenv("AWS_KEY_ID")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")


@app.get("/")
async def ping():
    return {"message": "Heed Up"}

if __name__ == "__main__":
    # Print Rocketry's logs to terminal
    # logger = logging.getLogger("rocketry.task")
    # logger.addHandler(logging.StreamHandler())

    # Run both applications
    asyncio.run(main())
