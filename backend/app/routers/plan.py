from fastapi import  status, Depends, HTTPException, APIRouter, UploadFile, File, Form, Query, Request, HTTPException
import services as _services
import models, schema
from typing import List, Union, Optional
from sqlalchemy.orm import Session
import auth
import crud
import math
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
import shutil
import cloudinary
import cloudinary.uploader
from BitlyAPI import shorten_urls
import crud
from jwt import main_login, get_access_token, verify_password, refresh
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from emails import send_delete_email, send_email, verify_token, send_password_reset_email, password_verif_token, send_deactivation_email

from authlib.integrations.starlette_client import OAuth
from authlib.integrations.starlette_client import OAuthError
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse
from starlette.responses import RedirectResponse
from datetime import datetime, date


plan_router = APIRouter(
    prefix="/plans",
    tags=["User Subscription Plans"])


def convert_plan(plan_data: dict, user:models.User, db: Session):
    """ Function to change user plans and convert balance time for new plans """
    company = db.query(models.Company).filter(models.Company.id == user.company_id).first()
    old_plan = plan_data["current_plan"]
    balance_time = plan_data["minutes"]
    if old_plan != "Free":
        initial_plan = crud.get_plan_by_name(db, old_plan)
        initial_plan_price = initial_plan.price
        upgrade_plan = crud.get_plan_by_name(db, plan_data["new_plan"])
        upgrade_plan_price = upgrade_plan.price
        
        cash_amount = balance_time * initial_plan_price
        upload_time = float(cash_amount / upgrade_plan_price)
        
        if upload_time < 3600:
            raise HTTPException(status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Your balance is too low for this plan")
        # print (cash_balance, upload_time)
        else:
            # return upload_time
            company.plan = plan_data["new_plan"]
            company.time_left = upload_time
            db.commit()
            db.refresh(company)
            return {"message": f"plan succesfully changed to {plan_data['new_plan']}"}



@plan_router.patch("/change_plan", description="Change the user's subscription plan", status_code=status.HTTP_200_OK)
def change_plan(user_plan:schema.ChangePlan , logged_in_user:models.User = Depends(auth.get_active_user), db: Session = Depends(_services.get_session)):
    plan_details = {"current_plan": logged_in_user.company.plan,
                    "new_plan": user_plan.plan,
                    "minutes": logged_in_user.company.time_left}
    return convert_plan(plan_details, logged_in_user, db)
        
@plan_router.get("/view_plan", description="View User's current subscription plan", status_code=status.HTTP_200_OK)
def view_user_plan(user: models.User=Depends(auth.get_active_user), db: Session = Depends(_services.get_session)):
    user_plan = db.query(models.ProductPlan).filter(models.ProductPlan.name == user.company.plan).first()
    amount_left = math.floor(user_plan.price * user.company.time_left)
    
    plan_details = {"current_plan": user_plan.name , 
                    "Amount": amount_left,
                    "Time_Left": math.floor(user.company.time_left / 60)}
    
    return plan_details


@plan_router.get("/get_all_plans", summary = "get all plans", status_code= 200)
def read_plans(skip: int = 0, limit: int = 100, db: Session = Depends(_services.get_session)):
    try:
        plans = crud.get_all_plans(db, skip=skip, limit=limit)
    except Exception as e:
       return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {      
        "detail": plans
    }
    
    
@plan_router.delete("/delete_plan/{plan_name}")
async def delete_plan(plan_name: str, db: Session = Depends(_services.get_session), user: models.User = Depends(get_admin)):
    try:
        db_plan = crud.get_plan_by_name(db, plan_name)
        if db_plan is None:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "Plan not found!"}),
            )

        crud.delete_plan(db, plan_name)
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {
        "detail": "Plan deleted successfully!"
    }

@plan_router.delete("/delete_plan_id/{plan_id}")
async def delete_plan(plan_id: int, db: Session = Depends(_services.get_session), user: models.User = Depends(get_admin)):
    try:
        db_plan = crud.get_plan_by_id(db, plan_id)
        if db_plan is None:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "Plan with such ID not found!"}),
            )

        crud.delete_plan_by_id(db, plan_id)
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {
        "detail": "Plan deleted successfully!"
    }

@plan_router.get("/get_plan_id/{plan_id}")
async def get_plan(plan_id: int, db: Session = Depends(_services.get_session)):
    try:
        db_plan = crud.get_plan_by_id(db, plan_id)
        if db_plan is None:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "Plan with such ID not found!"}),
            )

        plan = crud.get_plan_by_id(db, plan_id)
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {
        "detail": plan
    }



@plan_router.post("/add_new_plan")
async def add_new_plan(plan_name: str = Form(),
                       plan_price: float = Form(),
                       features: List[str] = Form(),
                       duration: str = Form(),
                       title: str = Form(),
                       audio_intelligence: bool = Form(),
                       live_stream: bool = Form(),
                       file: UploadFile = File(..., content_type='image/*'),
                       db: Session = Depends(_services.get_session), user: models.User = Depends(get_admin)):
    try:    
        result = cloudinary.uploader.upload(file.file)
        url = result.get("secure_url")
        urls = [url]
        response = shorten_urls(urls)
        retrieve_url = response[0]
        new_url = retrieve_url.short_url
        
        feature = "".join(features)
        new_features = feature.split(",")
        
        plan = {
            "name": plan_name,
            "price": float(plan_price),
            "features": new_features,
            "duration": duration,
            "title": title,
            "audio": audio_intelligence,
            "livestream": live_stream
        }
        
        add_plan = crud.add_plan(db, plan, new_url)
        # os.remove(file.filename)

    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {
        "detail": "Plan Added Successfully"
    }
    

