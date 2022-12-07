from typing import List, Union, Optional
from pathlib import Path
from models import Audio
from fastapi import Depends, FastAPI, UploadFile, File, status, HTTPException, Form, Query
from fastapi_pagination import Page, paginate, Params
from fastapi.middleware.cors import CORSMiddleware
from routers.sentiment import sentiment
from routers.transcribe import transcribe_file, get_transcript_result
from routers import sentiment
import auth
from routers.score import score_count
import uvicorn
from routers.transcribe import transcript_router
from routers.score import score_count
import models, json
from auth import get_active_user, get_current_user, get_admin
from jwt import main_login, get_access_token


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
from audio import audio_details
from starlette.requests import Request
import fastapi as _fastapi
import cloudinary
import cloudinary.uploader
from BitlyAPI import shorten_urls
import services as _services

from datetime import datetime, timedelta, date


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

apm_config = {
    'SERVICE_NAME': 'Heed',
    'SERVER_URL': 'http://localhost:8200',
    'ENVIRONMENT': 'production',
    'GLOBAL_LABELS': 'platform=DemoPlatform, application=DemoApplication'
}
apm = make_apm_client(apm_config)

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

app.include_router(transcript_router)
app.add_middleware(ElasticAPM, client=apm)

origins = [
    "http://localhost",
    "http://localhost:80",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:1111",
    "http://localhost:8000",
    "https://heed.hng.tech",
    "http://heed.hng.tech",
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
    #finally:
        f#ile.file.close()

    try:
        result = cloudinary.uploader.upload_large(file.filename, resource_type = "auto", 
                                            chunk_size = 6000000)
        url = result.get("secure_url")
        urls = [url]
        response = shorten_urls(urls)
        retrieve_url = response[0]
        new_url = retrieve_url.short_url
        
    except Exception:
        return {"error": "There was an error uploaading the file"}

    s3 = boto3.client('s3', aws_access_key_id= AWS_KEY_ID,
        aws_secret_access_key= AWS_SECRET_KEY
        )
    audio_file = file.file.read()
    bucket = "hng-heed"

    s3.upload_fileobj(
        io.BytesIO(audio_file),
        bucket,
        file.filename,
        ExtraArgs = {"ACL": "public-read"}
    )
    audio_s3_url = f"https://{bucket}.s3.amazonaws.com/{file.filename}"


    # transcript = transcript
    
    size = Path(file.filename).stat().st_size / 1048576
    duration = audio_details(file.filename)["mins"]
    transcript = transcribe_file(new_url)
    # get some essential parameters
    audio_url = transcript['audio_url']
    job_status = transcript['status']
    transcript_id = transcript['id']
    

    db_audio = models.Audio(audio_path=audio_url, job_id = transcript_id, user_id=user_id, size=size, duration=duration, 
                            agent_id=db_agent.id, agent_firstname= db_agent.first_name, agent_lastname=db_agent.last_name, 
                            filename = file.filename)

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
        "transcript_id": transcript_id,
        "s3 bucket url": audio_s3_url
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


# @app.post("/users/upload_picture", summary="Upload company logo image", status_code=status.HTTP_202_ACCEPTED, tags=['users'])
# def upload_picture(db:Session = Depends(get_db), image_file: UploadFile = File(..., description="Company Profile Image/Logo"), 
#                    current_user:schema.User = Depends(get_active_user)):
#     return crud.upload_user_image(user_id=current_user.id, db=db, image_file=image_file)

# @app.patch("/users/update_profile", summary="Update user profile details", status_code=status.HTTP_200_OK, tags=['users'])
# def update_adress(profile:schema.UserProfileUpdate, db:Session = Depends(get_db), current_user:schema.User = Depends(get_active_user)):
#     return crud.update_user_profile(db=db, profile=profile, user_id=current_user.id)

@app.patch("/users/update_profile", summary="Update user profile details", status_code=status.HTTP_200_OK, tags=['users'])
def update_profile( 
                   first_name:Optional[str] = Form(None), 
                   last_name:Optional[str] = Form(None), 
                   company_name: Optional[str] = Form(None), 
                   company_address:Optional[str] = Form(None), 
                   phone_number: Optional[str] = Form(None), 
                   db:Session = Depends(get_db), 
                   current_user:schema.User = Depends(get_active_user),
                  image_file: Optional[UploadFile] = File(None, description="Company Profile Image/Logo")):
    return crud.update_user_profile(db=db, first_name=firstname, last_name=lastname,company_address=company_address,
                               company_name=company_name, phone_number=phone_number, current_user=current_user, image_file=image_file)

    
           

@app.delete("/users/delete_account/{user_id}", summary="delete user account", tags=['users'])
def delete_user_account(user_id: int , db:Session = Depends(get_db), current_user:schema.User = Depends(get_admin)):
    return crud.delete_user(db=db, user_id=user_id)

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
async def free_trial(db : Session = Depends(get_db), file: UploadFile = File(...)):
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
        try:
            result = cloudinary.uploader.upload_large(file.filename, resource_type = "auto", 
                                            chunk_size = 6000000)
            url = result.get("secure_url")
            urls = [url]
            response = shorten_urls(urls)
            retrieve_url = response[0]
            new_url = retrieve_url.short_url
        except Exception:   
            return {"error": "There was an error uploading the file"}
        # transcript = transcript
    transcript = transcribe_file(new_url)
    # get some essential parameters
    transcript_id = transcript['id']
    transcript_status = transcript['status']

    callback = models.FreeTrial(transcript_id = transcript_id, transcript_status=transcript_status)

    db.add(callback)
    db.commit()
    db.refresh(callback)
    # delete the file
    os.remove(file.filename)

    return {"transcript_id": transcript_id, "status": transcript_status}


@app.get("/get_transcript/{transcript_id}", description="Retrieving transcript by audio ID")
def view_transcript(transcript_id: Union[int, str], db: Session = Depends(_services.get_session)):
    transcript = db.query(models.FreeTrial).filter(models.FreeTrial.transcript_id == transcript_id).first()
    if not transcript:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Transcription with id: {transcript_id} was not found")
    transcript_audio_id = transcript_id
    
    
    transcript_audio = get_transcript_result(transcript_audio_id)
    transcript.job_status = transcript_audio['status']
    # db.commit()
    
    if transcript_audio['status'] != "completed":
        return {"status":transcript_audio['status']}
    else:
        # get the text.
        transcripted_word = transcript_audio['text']
        sentiment_result = sentiment.sentiment(transcripted_word)

        overall_sentiment = sentiment_result['overall_sentiment']

        return {"transcription": transcripted_word, "overall_sentiment_result": overall_sentiment}


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


@app.get("/list-audios-by-user", summary = "list all user audios with their status")
def list_audios_by_user(db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    result = crud.get_audios_by_user(db, user_id=user.id)
    audios = []
    for i in result:
        audio = {
            "id": i.id,
            "filename": i.filename,
            "job_id": i.job_id,
            "duration": i.duration,
            "size": i.size,
            "timestamp": i.timestamp,
            "job_details": i.job

        }
        audios.append(audio)
    return audios
    
@app.get("/get_uploaded_jobs", summary="List all uploaded jobs with job details", status_code=status.HTTP_200_OK, tags=['jobs'])
def get_uploaded_jobs(db:Session = Depends(get_db), current_user = Depends(get_active_user), skip: int = 0, limit: int = 2):
    return crud.get_jobs_uploaded(db=db, skip=skip, limit=limit, current_user=current_user)

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
            {"total_recording": 0},
            {"id": 1, "time": "M", "totalRecordings": 0},
            {"id": 2, "time": "T", "totalRecordings": 0},
            {"id": 3, "time": "W", "totalRecordings": 0},
            {"id": 4, "time": "T", "totalRecordings": 0},
            {"id": 5, "time": "F", "totalRecordings": 0},
            {"id": 6, "time": "S", "totalRecordings": 0},
            {"id": 7, "time": "S", "totalRecordings": 0}
        ],
        "month": [
            {"total_recording": 0},
            {"id": 1, "time": "wk1", "totalRecordings": 0},
            {"id": 2, "time": "wk2", "totalRecordings": 0},
            {"id": 3, "time": "wk3", "totalRecordings": 0},
            {"id": 4, "time": "wk4", "totalRecordings": 0}
        ]
    }
    for i in total_recordings:
        if i.timestamp.isocalendar().week == week:
            results["week"][0]["total_recording"] += 1
            if i.timestamp.weekday() == 0:
                results["week"][1]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 1:
                results["week"][2]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 2:
                results["week"][3]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 3:
                results["week"][4]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 4:
                results["week"][5]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 5:
                results["week"][6]["totalRecordings"] += 1
            elif i.timestamp.weekday() == 6:
                results["week"][7]["totalRecordings"] += 1

        if i.timestamp.month == month:
            results["month"][0]["total_recording"] += 1
            if i.timestamp.day <= 7:
                results["month"][1]["totalRecordings"] += 1
            elif 8 <= i.timestamp.day <= 14:
                results["month"][2]["totalRecordings"] += 1
            elif 15 <= i.timestamp.day <= 21:
                results["month"][3]["totalRecordings"] += 1
            elif 22 <= i.timestamp.day <= 31:
                results["month"][4]["totalRecordings"] += 1

    return results


@app.get("/leaderboard", summary = "get agent leaderboard", tags=['agent leaderboard'])
def get_agents_leaderboard(db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    leaderboard = crud.get_leaderboard(db, user.id)
    top3_agents = leaderboard[:3]
    others = leaderboard[3:]
    return {"Top3_Agents": top3_agents, "Other_Agents": others}

#agent total_analysis
@app.get("/total-agent-analysis", summary="get total agent analysis")
def get_total_agent_analysis(agent_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    total_analysis = db.query(models.Audio).filter(models.Audio.user_id == user.id, models.Audio.agent_id == agent_id)
    week = datetime.now().isocalendar().week
    month = datetime.now().month
    result = {
        "week": [
            {"total_recording": 0},
            {"id": 1, "time": "Day 1", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 2, "time": "Day 2", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 3, "time": "Day 3", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 4, "time": "Day 4", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 5, "time": "Day 5", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 6, "time": "Day 6", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 7, "time": "Day 7", "positive": 0, "negative": 0, "neutral": 0}
        ],
        "month": [
            {"total_recording": 0},
            {"id": 1, "time": "wk1", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 2, "time": "wk2", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 3, "time": "wk3", "positive": 0, "negative": 0, "neutral": 0},
            {"id": 4, "time": "wk4", "positive": 0, "negative": 0, "neutral": 0}
        ]
    }
    for i in total_analysis:
        if i.timestamp.isocalendar().week == week:
            result["week"][0]["total_recording"] += 1
            for y in range(7):
                if i.timestamp.weekday() == y:
                    if i.overall_sentiment == "Positive":
                        result["week"][y+1]["positive"] += 1
                    elif i.overall_sentiment == "Negative":
                        result["week"][y+1]["negative"] += 1
                    elif i.overall_sentiment == "Neutral":
                        result["week"][y+1]["neutral"] += 1
        if i.timestamp.month == month:
            result["month"][0]["total_recording"] += 1
            if i.timestamp.day <= 7:
                if i.overall_sentiment == "Positive":
                    result["month"][1]["positive"] += 1
                elif i.overall_sentiment == "Negative":
                    result["month"][1]["negative"] += 1
                elif i.overall_sentiment == "Neutral":
                    result["month"][1]["neutral"] += 1
            elif 8 <= i.timestamp.day <= 14:
                if i.overall_sentiment == "Positive":
                    result["month"][2]["positive"] += 1
                elif i.overall_sentiment == "Negative":
                    result["month"][2]["negative"] += 1
                elif i.overall_sentiment == "Neutral":
                    result["month"][2]["neutral"] += 1
            elif 15 <= i.timestamp.day <= 21:
                if i.overall_sentiment == "Positive":
                    result["month"][3]["positive"] += 1
                elif i.overall_sentiment == "Negative":
                    result["month"][3]["negative"] += 1
                elif i.overall_sentiment == "Neutral":
                    result["month"][3]["neutral"] += 1
            elif 22 <= i.timestamp.day <= 31:
                if i.overall_sentiment == "Positive":
                    result["month"][4]["positive"] += 1
                elif i.overall_sentiment == "Negative":
                    result["month"][4]["negative"] += 1
                elif i.overall_sentiment == "Neutral":
                    result["month"][4]["neutral"] += 1

    return result


@app.get("/account", summary = "get user profile details", tags=['users'])
async def my_profile (db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    user_id = user.id
    return crud.get_user_profile(db, user_id)



@app.post('/forgot-password', summary = "get token for password reset", tags=['users'])
async def forgot_password(email: schema.ForgetPassword, db: Session = Depends(get_db)):
    user: models.User = crud.get_user_by_email(db, email.email)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    
    token = await send_password_reset_email([email.email], user)
    return token
    

@app.patch('/reset-password', summary = "reset password", tags=['users'])
async def reset_password(token: str, new_password: schema.UpdatePassword, db: Session = Depends(get_db)):
    email = password_verif_token(token)
    user: models.User = crud.get_user_by_email(db, email)
        
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    reset_done = crud.reset_password(db, new_password.password, user)

    if not reset_done:
        raise HTTPException(status_code=500)
    
    return reset_done





# @app.route('/logout/google')
# async def logout(request: Request):
#     request.session.pop('user', None)
#     return RedirectResponse(url='/')


@app.get('/login/google')
async def login(request: Request):
    redirect_uri = request.url_for('auth')  # This creates the url for our /auth endpoint
    return await oauth.google.authorize_redirect(request, redirect_uri)


@app.get('/auth/google')
async def auth(request: Request, db: Session = Depends(get_db)):
    try:
        access_token = await oauth.google.authorize_access_token(request)
    except OAuthError:
        raise HTTPException(status_code=500, detail='Something went wrong while authenticating')
    user_data = access_token['userinfo']
    print(user_data)
    email = user_data.email
    user_db = crud.get_user_by_email(db, email)

    if user_db is None:
        raise HTTPException(status_code=404, detail="User not found, Are you sure this is the email you used when signing up for the platform?")

    tokens = get_access_token(email)
    return tokens



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



@app.get("/download/{id}")
def download (id: Union[int, str], db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    db_audio = db.query(models.Audio).filter(models.Audio.job_id == id).first()

    if db_audio is None:
        raise HTTPException(status_code=404, detail="No Audio With This ID")
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

@app.post("/orders", description="creating an order by selecting a billing plan")
async def create_order(order: schema.OrderCreate, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    user_email = user.email
    db_order = models.Order(billing_plan=order.billing_plan, user_email=user_email)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    if  db_order.billing_plan== "startup monthly" or "Startup Monthly" or "STARTUP MONTHLY":
        db_order.monthly_amount = 7500
        db_order.total_amount = 7500
        db_order.next_payment_due_date = date.today() + timedelta(days=30)

    elif db_order.billing_plan== "growing monthly" or "Growing Monthly" or "GROWING MONTHLY":
        db_order.monthly_amount = 13500
        db_order.total_amount = 13500
        db_order.next_payment_due_date = date.today() + timedelta(days=30)

    elif db_order.billing_plan== "enterprise monthly" or "Enterprise Monthly" or "ENTERPRISE MONTHLY":
        db_order.monthly_amount = 24000
        db_order.total_amount = 24000
        db_order.next_payment_due_date = date.today() + timedelta(days=30)

    elif db_order.billing_plan== "startup annually" or "Startup Annually" or "STARTUP ANNUALLY":
        db_order.monthly_amount = 7500
        db_order.total_amount = 6500 * 12
        db_order.annual_amount = 6500 * 12
        db_order.next_payment_due_date = date.today() + timedelta(days=365)

    elif db_order.billing_plan== "growing annually" or "Growing Annually" or "GROWING ANNUALLY":
        db_order.monthly_amount = 13500
        db_order.total_amount = 10000 * 12
        db_order.annual_amount = 10000 * 12
        db_order.next_payment_due_date = date.today() + timedelta(days=365)

    elif db_order.billing_plan== "enterprise annually" or "Enterprise Annually" or "ENTERPRISE ANNUALLY":
        db_order.monthly_amount = 21000
        db_order.total_amount = 21000 * 12
        db_order.annual_amount = 21000 * 12
        db_order.next_payment_due_date = date.today() + timedelta(days=365)

    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order
    

@app.get("/orders", description="Retrieving orders by user email")
async def get_order_summary (db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    user_email = user.email
    return crud.get_order_summary_by_email(db, user_email)

@app.get("/orders/{order_id}", description="Retrieving a specific order by id")
async def get_order_summary (order_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    order_summary = crud.get_order_summary_by_id(db, order_id=order_id)
    if order_summary is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order_summary

    
    
@app.get("/AgentDetails", summary = "get agent performance report", tags=['Agent Performance Report'])
def get_agent_performance(agent_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    try:
        leaderboard = crud.get_leaderboard(db, user.id)
        for i in leaderboard:
            if i["agent_id"] == agent_id:
                result = i
                break
        return {"Agent_Performance_Report": result}
    except:
        return {"message": "agent does not exist"}

