from fastapi import (BackgroundTasks, UploadFile,File, Form, Depends, HTTPException, status)
from fastapi_mail import FastMail, ConnectionConfig, MessageSchema
from typing import List
from jose import jwt, JWTError
from fastapi.exceptions import HTTPException
from datetime import datetime, timedelta
from jwt import credentials_exception
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

                    <a href="https://api.heed.hng.tech/verification?token={token}">Verify your email address </a>
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



async def send_password_reset_email(email: List, instance: User):
    expire = datetime.utcnow() + timedelta(minutes=1440)


    token_data = {
        'sub': instance.email,
        'exp': expire,
    }

    token = jwt.encode(token_data, os.getenv('SECRET'), algorithm='HS256')

    first_name = instance.first_name



    template = f"""
        <div>
                    <h3>Reset Password</h3>
                    <br>
                    <p>Dear, {first_name}</p>
                    <p>
                        To reset your password
                        <a href="http://heed.hng.tech/set-new-password?token={token}">
                            Click here
                        </a>.
                    </p>

                    <p>Alternatively, you can paste the following link in your browser's address bar:</p>
                    <p>"http://heed.hng.tech/set-new-password?token={token}"</p>
                    <p>If you have not requested a password reset simply ignore this message.</p>

                    <p>Sincerely</p>
                    <p>Heed Team</p>

        </div>
    """

    message = MessageSchema(
        subject = "Reset Password",
        recipients =email,
        body = template,
        subtype = "html"
    )

    fm =FastMail(conf)
    await fm.send_message(message=message)

    return token



def password_verif_token(token):
    try:
        payload = jwt.decode(token, os.getenv('SECRET'), algorithms=['HS256'])
        email:str = payload.get('sub')
        # exp_date: datetime = payload.get('exp')
    except JWTError:
        raise credentials_exception
    
    return email
