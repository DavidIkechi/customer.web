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
    
    
async def transcription_fail_email(email: List, instance: User):
    first_name = instance.first_name

    template = f"""
        <div>
            <h3>Transcription Result</h3>
            <br>
            <p><b>Dear {first_name},</b></p>
            <p>
                An error occured while trying to upload your audios with file names: 
                bla bla bla.
            </p>

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



async def send_successful_payment_email(email: List, instance: User, plan, minutes, price):

    emails: EmailSchema = {
        "body": {
            "url": f"https://heed.cx/dashboard",
            "firstname": instance.first_name,
            "plan": plan,
            "minutes" : minutes,
            "price" : price
        } 
    }

    message = MessageSchema(
        subject = "HEED - Successful Top-Up",
        recipients =email,
        template_body=emails.get("body"),
        subtype=MessageType.html,
    )

    fm =FastMail(conf)
    await fm.send_message(message=message, template_name='TopUp/success.html')

async def send_failed_payment_email(email: List, instance: User, plan, minutes, price, reference):

    emails: EmailSchema = {
        "body": {
            "firstname": instance.first_name,
            "plan": plan,
            "minutes" : minutes,
            "price" : price,
            "reference": reference
        } 
    }

    message = MessageSchema(
        subject = "HEED - Failed Top-up",
        recipients =email,
        template_body=emails.get("body"),
        subtype=MessageType.html,
    )

    fm =FastMail(conf)
    await fm.send_message(message=message, template_name='TopUp/failure.html')

async def agent_report_email(email: List, instance: User, reports: List):
    firstname = instance.first_name
    top = """"""
    bottom = """"""
    phrase = ""
    for report in reports[:3]:
        board = f"""
            <li>
                <h3> {report["firstname"]} {report["lastname"]} </h3>
                <p> Total calls: {report["total_calls"]} </p>
                <p> Positive calls: {report["positive_score"]} </p>
                <p> Negative calls: {report["negative_score"]} </p>
                <p> Neutral calls: {report["neutral_score"]} </p>
                <p> Rank: {report["rank"]}</p>
            </li>
        """
        top += board

    if len(reports) > 3:
        phrase = "Your bottom 3 agents for this month are:"
        for report in reports[3:]:
            board = f"""
                <li>
                    <h3> {report["firstname"]} {report["lastname"]} </h3>
                    <p> Total calls: {report["total_calls"]} </p>
                    <p> Positive calls: {report["positive_score"]} </p>
                    <p> Negative calls: {report["negative_score"]} </p>
                    <p> Neutral calls: {report["neutral_score"]} </p>
                    <p> Rank: {report["rank"]}</p>
                </li>
            """
            bottom += board

    template = f"""
    <div>
    <h3>Transcription Result</h3>
    <br>
    <p><b>Dear {firstname},</b></p>
    <p>
        Your top 3 agents for this month are:
    </p>
    <ol>
        {top}
    </ol>
    <p>{phrase}</P>
    <ol>
        {bottom}
    </ol>
    <p>Sincerely,</p>
    <p>Heed Team</p>

</div>
    """
    

    message = MessageSchema(
        subject = "Agent Leaderboard",
        recipients = email,
        body = template,
        subtype = "html"
    )

    fm =FastMail(conf)
    await fm.send_message(message=message)
