from fastapi import (BackgroundTasks, UploadFile,File, Form, Depends, HTTPException, status)
from fastapi_mail import FastMail, ConnectionConfig, MessageSchema, MessageType
from typing import List, Dict, Any
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
from pydantic import EmailStr, BaseModel



# Load all environment variables
load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME = os.getenv('EMAIL'),
    MAIL_PASSWORD = os.getenv('PASS'),
    MAIL_FROM = os.getenv('EMAIL'),
    MAIL_PORT = 465,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_FROM_NAME="Heed",
    MAIL_STARTTLS = False,
    USE_CREDENTIALS = True,
    MAIL_SSL_TLS= True,
    VALIDATE_CERTS = True,
    TEMPLATE_FOLDER='../templates'

)

class EmailSchema(BaseModel):
    body: Dict[str, Any]

async def send_email(email: List, instance: User):
    token_data = {
        'email': instance.email,
        # 'username': instance.username
    }

    token = jwt.encode(token_data, os.getenv('SECRET'), algorithm='HS256')
    
    emails: EmailSchema = {
        "body": {
            "url": f"https://heed.cx/verification?token={token}",
            "firstname": instance.first_name
        } 
    }

    message = MessageSchema(
        subject = "Account Verification",
        recipients =email,
        template_body=emails.get("body"),
        subtype=MessageType.html,
    )

    fm =FastMail(conf)
    await fm.send_message(message=message, template_name='EmailVerification/index.html')


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

    emails: EmailSchema = {
        "body": {
            "url": f"https://heed.cx/set-new-password?token={token}",
            "firstname": instance.first_name
        } 
    }

    message = MessageSchema(
        subject = "Password Reset",
        recipients =email,
        template_body=emails.get("body"),
        subtype=MessageType.html,
    )

    fm =FastMail(conf)
    await fm.send_message(message=message, template_name='ResetPassword/index.html')

    return token



def password_verif_token(token):
    try:
        payload = jwt.decode(token, os.getenv('SECRET'), algorithms=['HS256'])
        email:str = payload.get('sub')
        # exp_date: datetime = payload.get('exp')
    except JWTError:
        raise credentials_exception
    
    return email


async def transcription_result_email(email: List, instance: User):
    first_name = instance.first_name

    template = f"""
        <div>
            <h3>Transcription Result</h3>
            <br>
            <p><b>Dear {first_name},</b></p>
            <p>
                The results for your uploads are ready! 
                <a href="https://heed.cx/transcriptions/">
                    Click here to view
                </a>
            </p>

            <p>Alternatively, you can paste the following link in your browser's address bar:</p>
            <p>"https://heed.cx/transcriptions/"</p>

            <p>Sincerely,</p>
            <p>Heed Team</p>

        </div>
    """

    message = MessageSchema(
        subject = "Transcription Result",
        recipients = email,
        body = template,
        subtype = "html"
    )

    fm =FastMail(conf)
    await fm.send_message(message=message)
async def send_deactivation_email(email: List, instance: User):

    emails: EmailSchema = {
        "body": {
            "firstname": instance.first_name
        } 
    }

    message = MessageSchema(
        subject = "Account Deactivation",
        recipients =email,
        template_body=emails.get("body"),
        subtype=MessageType.html,
    )

    fm =FastMail(conf)
    await fm.send_message(message=message, template_name='Deactivation/index.html')

    return {
        "detail": "Your Account has been deactivated successfully"
    }

async def send_delete_email(email: List, instance: dict):

    emails: EmailSchema = {
        "body": {
            "firstname": instance["first_name"]
        } 
    }

    message = MessageSchema(
        subject = "Account Deletion",
        recipients =email,
        template_body=emails.get("body"),
        subtype=MessageType.html,
    )

    fm =FastMail(conf)
    await fm.send_message(message=message, template_name='Deletion/index.html')


async def verify_token(token: str, db: Session):
    try:
        payload = jwt.decode(token, os.getenv('SECRET'), algorithms=['HS256'])
        user = get_user_by_email(db, payload.get("email"))

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="The token is invalid or has expired!",
            headers={"WWW.Authenticate": "Bearer"}
        )
    return user


async def send_freeTrial_email(email: List, instance: User):
    token_data = {
        'email': instance.email,
        # 'username': instance.username
    }

    token = jwt.encode(token_data, os.getenv('SECRET'), algorithm='HS256')


    template = f"""
        <div>
                    <h3>Free Trial Result</h3>
                    <br>
                    <p>Dummy Free Trial Email</p>
        </div>
    """

    message = MessageSchema(
        subject = "Free Trial Result",
        recipients =email,
        body = template,
        subtype = MessageType.html,
    )

    fm =FastMail(conf)
    await fm.send_message(message=message)

