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
from datetime import datetime, timedelta, date
import pytz
import tzlocal
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


sentiment_router = APIRouter(
    prefix='/sentiments',
    tags=['sentiments'],
)

# send to the sentiment route
@sentiment_router.get("/download/{id}", status_code = 200)
def download (id: Union[int, str], db: Session = Depends(_services.get_session), user: models.User = Depends(get_active_user)):
    try:
        
        db_audio = crud.get_freeaudio(db, audio_id=id)

        if db_audio is None:
            return JSONResponse(
                status_code= 500,
                content=jsonable_encoder({"detail": "Sorry, this transcript is not available for download"}),
            )        
        else:
            positivity_score = float(db_audio.positivity_score)
            negativity_score = float(db_audio.negativity_score)
            neutrality_score = float(db_audio.neutrality_score)
            overall_sentiment = str(db_audio.overall_sentiment)
            most_positive_sentences = json.loads(db_audio.most_positive_sentences)
            most_negative_sentences = json.loads(db_audio.most_negative_sentences)
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
    return sentiment
    
@sentiment_router.get("/total-analysis", summary="get user total analysis", status_code = 200)
def get_total_analysis(db: Session = Depends(_services.get_session), user: models.User = Depends(get_active_user)):
    
    try: 
        local_timezone = tzlocal.get_localzone()
        overall_sentiment = db.query(models.Audio).filter(models.Audio.user_id == user.id).all()
        
        week = datetime.now().astimezone(local_timezone).isocalendar()[1]
        month = datetime.now().astimezone(local_timezone).month
        list_month=[]
        list_week=[]
        week_item={}
        month_item={}
        result = dict()
        for i in overall_sentiment:
            if i.timestamp.astimezone(local_timezone).month == month:
                list_month.append(i.overall_sentiment)
            if i.timestamp.astimezone(local_timezone).isocalendar()[1] == week:
                list_week.append(i.overall_sentiment)
        if len(list_week) > 0:
            week_item['id'] = 1
            week_item['positive'] = list_week.count("Positive")
            week_item['neutral'] = list_week.count("Neutral")
            week_item['negative'] = list_week.count("Negative")
            result['week'] = [week_item]
        
        if len(list_month) > 0:
            month_item['id'] = 1
            month_item['positive'] = list_month.count("Positive")
            month_item['neutral'] = list_month.count("Neutral")
            month_item['negative'] = list_month.count("Negative")
            result['month'] = [month_item]
            
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {"detail": result}

@sentiment_router.get("/new_analysis/{id}", 
                      status_code= 200, summary = "get result of a sentiment analysis", response_model=schema.Analysis)
def get_sentiment_result(id: int, db: Session = Depends(_services.get_session)):
    """
    Get single analysis
    """
    try:
        analysis = crud.get_analysis(db, id)
        if not analysis:
            raise HTTPException(
                status_code=404,
                detail="The analysis doesn't exist",
            )
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
        
    return {"detail": analysis}
