from fastapi import FastAPI, status, Depends, APIRouter,  UploadFile, File, Form, Query, Request
from typing import List, Union, Optional
import services as _services
import models, schema, json
from fastapi_pagination import Page, paginate, Params
from sqlalchemy.orm import Session
from auth import (
    get_active_user,
    get_admin,
    get_current_user
)
import auth
from . import utility as utils
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import os
import cloudinary
import cloudinary.uploader
from BitlyAPI import shorten_urls
import crud
from jwt import main_login, get_access_token, verify_password, refresh
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from emails import send_email, verify_token, send_password_reset_email, password_verif_token
from datetime import datetime, timedelta, date


audio_router = APIRouter(
    prefix='/audios',
    tags=['audios'],
)

@audio_router.get("/list-audios-by-user", summary = "list all user audios with their status", status_code = 200)
def list_audios_by_user(db: Session = Depends(_services.get_session), user: models.User = Depends(get_active_user)):
    try:
        result = crud.get_audios_by_user(db, user_id=user.id)
        audio_list = []
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
            audio_list.append(audio)
        audios = sorted(audio_list, key=lambda x: x['id'], reverse=True)
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )   
    return {
        "detail": audios
    }
    
@audio_router.get("/get_uploaded_jobs", summary="List all uploaded jobs with job details", status_code= 200)
def get_uploaded_jobs(db:Session = Depends(_services.get_session), current_user = Depends(get_active_user), skip: int = 0, limit: int = 2):
    try:
        return {
            "detail": crud.get_jobs_uploaded(db=db, skip=skip, limit=limit, current_user=current_user)
        }
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )

# send.
@audio_router.get('/{audio_id}/sentiment', status_code = 200)
def read_sentiment(audio_id: int, db: Session = Depends(_services.get_session), user: models.User = Depends(get_active_user)):
    try:
        db_audio = crud.get_audio(db, audio_id=audio_id)
        if db_audio is None:
            return JSONResponse(
                status_code= 500,
                content=jsonable_encoder({"detail": "sentiment does not exists"}),
            )        
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
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {"detail": sentiment}


#get recent recordings
@audio_router.get("/recent-recordings", summary = "get user recent recording upload", 
         status_code = 200)
def get_recent_recordings(skip: int = 0, limit: int = 5, db: Session = Depends(_services.get_session), user: models.User = Depends(get_active_user)):
    try:
        recordings = db.query(models.Audio).filter(models.Audio.user_id == user.id).order_by(models.Audio.timestamp.desc()).offset(skip).limit(limit).all()
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {
        "detail": recordings
    }


#total-recordings
@audio_router.get("/total-recordings-user", summary="get total user recordings", status_code = 200)
def total_recordings_user(db: Session = Depends(_services.get_session), user: models.User = Depends(get_active_user)):
    
    try:
        total_recordings = db.query(models.Audio).filter(models.Audio.user_id == user.id)
        week = datetime.now().isocalendar().week
        month = datetime.now().month
        
        if total_recordings.count() > 0:
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
        else:
            results = {
                "week": [],
                "month": []
            }
    
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )        

    return {"detail": results}

@audio_router.delete("/delete", status_code = 200)
def delete_audios(audios: List[int] = Query(None), 
                  db: Session = Depends(_services.get_session), user: models.User = Depends(get_active_user)):
    deleted_audios = []
    try:
        for audio_id in audios:
            db_audio = crud.get_audio(db, audio_id=audio_id)
            if db_audio:
                db.delete(db_audio)
                db.commit()
                deleted_audios.append(db_audio.audio_path)
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {"detail": "operation successful", "deleted audion(s)": deleted_audios}
