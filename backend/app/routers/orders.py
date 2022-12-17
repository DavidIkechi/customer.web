from fastapi import FastAPI, status, Depends, APIRouter,  UploadFile, File, Form, Query, Request
from typing import List, Union, Optional
import services as _services
import models, schema
from sqlalchemy.orm import Session
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

order_router = APIRouter(
    prefix='/orders',
    tags=['orders'],
)

@order_router.get("/", description="Retrieving orders by user email")
async def get_order_summary (db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
    user_email = user.email
    return crud.get_order_summary_by_email(db, user_email)

@order_router.get("/orders/{order_id}", description="Retrieving a specific order by id")
async def get_order_summary (order_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_active_user)):
    order_summary = crud.get_order_summary_by_id(db, order_id=order_id)
    if order_summary is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order_summary