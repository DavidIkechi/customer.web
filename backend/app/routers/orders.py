from fastapi import FastAPI, status, Depends, APIRouter,  UploadFile, File, Form, Query, Request, HTTPException
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

from paystackapi.paystack import Paystack
from paystackapi.charge import Charge

from dotenv import load_dotenv
load_dotenv()


order_router = APIRouter(
    prefix='/orders',
    tags=['orders'],
)

@order_router.post("/create_order", description="Create an order for a user", status_code = 200)
async def create_order(userPayment: schema.PaymentBase, user: models.User = Depends(auth.get_active_user)):
    paystack = Paystack(secret_key=os.getenv('PAYSTACK_SECRET_KEY'))
    user_email = user.email
    try:
        # initialize a transaction.
        trans = paystack.transaction()
        res = trans.initialize(email= user_email, amount=userPayment.amount, 
                               metadata = {'minutes': userPayment.minutes, 'plan': userPayment.plan},
                               callback_url= "https://heed.hng.tech/checkout-growing")
        
        if res['status'] == True:
        # get the authorization url, access_code, and also the reference number.
            autho_url = res['data']['authorization_url']
            access_code = res['data']['access_code']
            reference = res['data']['reference']
        else:
            raise HTTPException(status_code=400, 
                                detail="An Error occurred while trying to initialize the transaction")

            
    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )
    
    return {"detail": autho_url}

