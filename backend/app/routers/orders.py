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

@order_router.post("/create_order", description="Create Paystack order for a user", status_code = 200)
async def create_order(userPayment: schema.PaymentBase, db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
    paystack = Paystack(secret_key=os.getenv('PAYSTACK_SECRET_KEY'))
    user_email = user.email
    try:
        # initialize a transaction.
        trans = paystack.transaction()
        # get amount for the plan.
        get_plan_details = crud.get_plan_by_name(db, userPayment.plan.lower())
        if get_plan_details is None:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "Sorry, we do not have that plan"}),
            )
            
        
            
        amount = get_plan_details.price * userPayment.minutes * 100
        if amount < 10:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "Sorry, minimum order you can place is $10"}),
            )
        
        # initialise the transaction
        res = trans.initialize(email= user_email, amount = amount,
                               metadata = {'minutes': userPayment.minutes, 'plan': userPayment.plan,
                                           'cancel_action': "https://heed.cx/paymentFailure"},
                               callback_url= "https://heed.cx/paymentSuccess")
        
        if res['status'] == True:
        # get the authorization url, access_code, and also the reference number.
            autho_url = res['data']['authorization_url']
            access_code = res['data']['access_code']
            reference = res['data']['reference']
        else:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "An error occured while trying to initialise payment, please try again"}),
            )

            
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    
    return {"detail": {
        "payment_url": autho_url,
        "gateway": "paystack"
        }
    }

@order_router.post("/verify_order/{ref_code}", description="Verify Paystack order for a user", status_code = 200)
async def verify_order(ref_code: str, db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
    paystack = Paystack(secret_key=os.getenv('PAYSTACK_SECRET_KEY'))
    try:
        check_trans = crud.check_transaction(db, ref_code)
        
        if check_trans is not None:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "you can not use the same reference code twice."}),
            )
            
        veri = paystack.transaction().verify(reference = ref_code)
        get_status = veri['data']
        if get_status['status'].strip().lower() != "success":
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "Sorry, your payment failed, please try again"}),
            )
        transaction = {"amount": get_status['amount']/100,
                       "trans_id": get_status['id'],
                       "reference": get_status['reference'],
                       "minutes": get_status['metadata']['minutes'],
                       "plan": get_status['metadata']['plan'],
                       "time_paid": get_status['paid_at'],
                       "payment_channel": get_status['channel'],
                       "email_address": user.email
                    }
        
        #push the details into the database.
        trans_crud = crud.store_transaction(db, transaction)
        top_up_details = {"minutes": get_status['metadata']['minutes'],
                       "plan": get_status['metadata']['plan']}
        # top up the users account
        top_up = crud.top_up(db,user.email, top_up_details)
        # send a mail receipt
        # await send_transaction_receipt([user.email], transaction)
        
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
        
    return {
        "detail": transaction
    }
