from fastapi import (BackgroundTasks, UploadFile,File, Form, Depends, HTTPException, status)
from fastapi_mail import FastMail, ConnectionConfig, MessageSchema
from typing import List
from jose import jwt
from fastapi.exceptions import HTTPException
from dotenv import dotenv_values
from models import User
from starlette.requests import Request
from starlette.responses import JSONResponse
from crud import get_user_by_email
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os


# Load all environment variables
load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME = os.getenv('EMAIL'),
    MAIL_PASSWORD = os.getenv('PASS'),
    MAIL_FROM = os.getenv('EMAIL'),
    MAIL_PORT = 465,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_STARTTLS = False,
    USE_CREDENTIALS = True,
    MAIL_SSL_TLS= True,
    VALIDATE_CERTS = True
)

async def send_email(email: List, instance: User):
    token_data = {
        'email': instance.email,
        # 'username': instance.username
    }

    token = jwt.encode(token_data, os.getenv('SECRET'), algorithm='HS256')


    template = f"""
        <div>
                    <h3>Account Verification </h3>
                    <br>
                    <p>Thank you for registering with us. Kindly click on the link below to
                    verify your email and have full acccess to the platform.</p>

                    <a href="http://scrybe.hng.tech:5000/verification?token={token}">Verify your email address </a>
        </div>
    """

    message = MessageSchema(
        subject = "Account Verification",
        recipients =email,
        body = template,
        subtype = "html"
    )

    fm =FastMail(conf)
    await fm.send_message(message=message)


async def verify_token(token: str, db: Session):
    try:
        payload = jwt.decode(token, os.getenv('SECRET'), algorithms=['HS256'])
        user = get_user_by_email(db, payload.get("email"))

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW.Authenticate": "Bearer"}
        )
    return user
