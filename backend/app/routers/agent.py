from fastapi import FastAPI, status, Depends, APIRouter,  UploadFile, File, Form, Query, Request
from typing import List, Union, Optional
from pathlib import Path
from audio import audio_details
import services as _services
import models, schema
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
from routers.transcribe import transcribe_file
from jwt import main_login, get_access_token, verify_password, refresh
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from emails import send_email, verify_token, send_password_reset_email, password_verif_token
from datetime import datetime, timedelta, date
import pytz
import tzlocal

agent_router = APIRouter(
    prefix='/agents',
    tags=['Agents'],
)

@agent_router.get("/leaderboard", summary = "get agent leaderboard", status_code = 200)
def get_agents_leaderboard(db: Session = Depends(_services.get_session), user: models.User = Depends(get_active_user)):
    # try:
    leaderboard = crud.get_leaderboard(db, user.id)
    results = {"week":{"Top3_Agents": [], "Other_Agents": []},
            "month":{"Top3_Agents": [], "Other_Agents": []}
    }
    results["week"]["Top3_Agents"] = leaderboard[0][:3]
    results["week"]["Other_Agents"] = leaderboard[0][3:]
    results["month"]["Top3_Agents"] = leaderboard[1][:3]
    results["month"]["Other_Agents"] = leaderboard[1][3:]
    # except Exception as e:
    #     return JSONResponse(
    #         status_code= status.HTTP_400_BAD_REQUEST,
    #         content=jsonable_encoder({"detail": str(e)}),
    #     ) 

    return {"detail": results}

#agent total_analysis
@agent_router.get("/total-agent-analysis", summary="get total agent analysis")
def get_total_agent_analysis(agent_id: int, db: Session = Depends(_services.get_session), user: models.User = Depends(get_active_user)):
    try:
        local_timezone = tzlocal.get_localzone()
        total_analysis = db.query(models.Audio).filter(models.Audio.user_id == user.id, models.Audio.agent_id == agent_id)
        week = datetime.now().astimezone(local_timezone).isocalendar()[1]
        month = datetime.now().astimezone(local_timezone).month
        year = datetime.now().astimezone(local_timezone).year
        
        month_weeks = [
            {"total_recording": 0}
        ]
        # get the number of week for that year and month.
        number_of_weeks = utils.weeks_in_month(year, month)
        

        for i in range(number_of_weeks):
            id_count = i + 1
            positive_count, negative_count, neutral_count = 0, 0, 0
            
            month_weeks.append(
                {"id": id_count, "time": "wk"+str(id_count), "positive": 0,
                 "negative": 0, "neutral": 0}
            )
            
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
            "month": month_weeks
        }
                
        for i in total_analysis:
            if i.timestamp.astimezone(local_timezone).isocalendar().week == week:
                result["week"][0]["total_recording"] += 1
                for y in range(7):
                    if i.timestamp.astimezone(local_timezone).weekday() == y:
                        if i.overall_sentiment == "Positive":
                            result["week"][y+1]["positive"] += 1
                        elif i.overall_sentiment == "Negative":
                            result["week"][y+1]["negative"] += 1
                        elif i.overall_sentiment == "Neutral":
                            result["week"][y+1]["neutral"] += 1
            if i.timestamp.astimezone(local_timezone).month == month:
                result["month"][0]["total_recording"] += 1
                get_time= i.timestamp.astimezone(local_timezone)
                get_day = get_time.day
                get_year = get_time.year
                get_month = get_time.month
                
                get_week = utils.week_of_month(datetime(get_year, get_month, get_day))
                if i.overall_sentiment == "Positive":
                    result["month"][get_week]["positive"] += 1
                elif i.overall_sentiment == "Negative":
                    result["month"][get_week]["negative"] += 1
                elif i.overall_sentiment == "Neutral":
                    result["month"][get_week]["neutral"] += 1
                
    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {"detail": result}

@agent_router.post("/agent", status_code = 200)
async def create_agent(agent: schema.AgentCreate, db: Session = Depends(_services.get_session), 
                       user: models.User = Depends(get_active_user)):
    try:
        company_id = user.company_id
    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {"detail": crud.create_agent(db, agent, company_id)}

@agent_router.get("/AgentDetails", summary = "get agent performance report", status_code = 200)
def get_agent_performance(agent_id: int, db: Session = Depends(_services.get_session), 
                          user: models.User = Depends(get_active_user)):
    try:
        result = {}
        result['week'] = []
        result['month'] = []
        leaderboard = crud.get_leaderboard(db, user.id)
        for i in leaderboard[0]:
            if i["agent_id"] == agent_id:
                result["week"] = i
                break
            else: 
                result["week"] = []
        for j in leaderboard[1]:
            if j["agent_id"] == agent_id:
                result["month"] = j
                break
            else: 
                result["month"] = []
        return {"detail": {"week": result["week"], "month": result["month"]}}
    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )