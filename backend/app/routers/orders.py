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

@order_router.get("/{order_id}", description="Retrieving a specific order by id")
async def get_order_summary (order_id: int, db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
    order_summary = crud.get_order_summary_by_id(db, order_id=order_id)
    if order_summary is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order_summary

@order_router.post("/", description="creating an order by selecting a billing plan")
async def create_order(order: schema.OrderCreate, db: Session = Depends(_services.get_session), 
                       user: models.User = Depends(auth.get_active_user)):
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