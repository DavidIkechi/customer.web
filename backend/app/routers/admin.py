from fastapi import FastAPI, status, Depends, APIRouter,  UploadFile, File, Form, Query, Request, HTTPException
from typing import List, Union, Optional
import services as _services
import models, schema
from fastapi_pagination import Page, paginate, Params
from sqlalchemy.orm import Session
from auth import (
    get_active_user,
    get_admin,
    get_current_user,
    get_super_admin
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
from emails import send_delete_email, send_email, verify_token, send_password_reset_email, password_verif_token, send_deactivation_email

from authlib.integrations.starlette_client import OAuth
from authlib.integrations.starlette_client import OAuthError
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import HTMLResponse
from starlette.responses import RedirectResponse
from datetime import datetime, date


admin_router = APIRouter(
    prefix='/admin',
    tags=['admin'],
)

# endpoint for user login
@admin_router.post('/make_super_admin', summary = "make super admin", status_code= 200)
async def make_admin(email_address: str, db: Session = Depends(_services.get_session),  user: models.User = Depends(get_super_admin)):
    try:
        db_user = crud.get_user_by_email(db, email = email_address)
        if not db_user:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "User not found"}),
            )        
        if db_user.is_super_admin:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "User is already a super admin"}),
            )
        db_user.is_admin = True   
        db_user.is_super_admin = True
        db.commit()
    
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    
    return {
        "detail": f"{db_user.first_name} is now a super admin"
    }
    
@admin_router.post("/add_admin_account", summary="Add Admin account", status_code = 200)
async def add_admin(email_account: str = Form(), db: Session = Depends(_services.get_session),
                    user: models.User = Depends(get_super_admin)):
    try:
        # first check if admin account already exists
        db_user = crud.get_user_by_email(db, email=email_account)
        if db_user:
            # check if the account is already an admin.
            if db_user.is_admin:
                return JSONResponse(
                    status_code=400,
                    content = jsonable_encoder({"detail": "User account already exists as an admin"})
                )
            else:
                return JSONResponse(
                    status_code=400,
                    content = jsonable_encoder({"detail": "User account already exists, please use the make admin endpoint"})
                )
                
        # the email must be valid please.
        email_exists = utils.validate_and_verify_email(email_account)
        if not email_exists:
            return JSONResponse(
                status_code=400,
                content = jsonable_encoder({"detail": "User email couldnot be verified!, please use a proper email"})
            )
        add_admin = crud.add_admin(db, email_account)
            
    except Exception as e:
        return JSONResponse(
            status_code = 500,
            content = jsonable_encoder({"detail": str(e)})
        )
        
    return {
        "details": f"{email_account} successfully added as admin account"
    }
    
@admin_router.post("/add_test_account", summary="Add test accounts", status_code = 200)
async def add_admin(email_account: str = Form(), db: Session = Depends(_services.get_session),
                    user: models.User = Depends(get_super_admin)):
    try:
        # first check if admin account already exists
        db_user = crud.get_user_by_email(db, email=email_account)
        if db_user:
            # check if the account is already an admin.
            return JSONResponse(
                status_code=400,
                content = jsonable_encoder({"detail": "User account already exists"})
            ) 
        # the email must be valid please.
        email_exists = utils.validate_and_verify_email(email_account)
        if not email_exists:
            return JSONResponse(
                status_code=400,
                content = jsonable_encoder({"detail": "User email couldnot be verified!, please use a proper email"})
            )
        add_admin = crud.add_test_users(db, email_account)
            
    except Exception as e:
        return JSONResponse(
            status_code = 500,
            content = jsonable_encoder({"detail": str(e)})
        )
        
    return {
        "details": f"{email_account} successfully added as test account"
    }
    
@admin_router.post('/make_admin', summary = "make user an admin", status_code= 200)
async def make_admin(email_address: str, db: Session = Depends(_services.get_session),  user: models.User = Depends(get_admin)):
    try:
        db_user = crud.get_user_by_email(db, email = email_address)
        if not db_user:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "User not found"}),
            )        
        if db_user.is_admin or db_user.is_super_admin:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "User is already an super admin"}),
            )
            
        db_user.is_admin = True
        db_user.company.time_left += 6000.0
        db.commit()
    
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    
    return {
        "detail": f"{db_user.first_name} is now an admin"
    }
    
@admin_router.delete("/delete_user/{user_id}", summary="delete user and admins", status_code = 200)
async def delete_user(user_id: int, db: Session = Depends(_services.get_session), user: models.User = Depends(get_super_admin)):
    try:
       # first check if the user account exists at first.
        db_user = crud.get_user(db, user_id)
        user_email = db_user.email
        db_user_id = crud.get_user_by_email(db, email=user_email)

        user_details = {
            "first_name": db_user_id.first_name
        }
        if db_user is None:
            raise HTTPException(status_code=404, 
                                detail="User not found")
            
        if db_user.is_super_admin:
            return JSONResponse(
                status_code=400,
                content = jsonable_encoder({"detail": "You can not delete a super admin account"})
            )
            
        # delete the user account
        crud.delete_user(db, user_id)
        await send_delete_email([user_email], user_details)
        
        return {"detail": 
            "Account was successfully deleted"}
        
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {
        "detail": "User Account was successfully deleted!"
    }
