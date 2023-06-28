from fastapi import FastAPI, status, Depends, APIRouter,  UploadFile, File, Form, Query, Request, HTTPException, Header, Request
from typing import List, Union, Optional
import services as _services
import models, schema
from sqlalchemy.orm import Session
import auth
from . import utility as utils
from fastapi.responses import JSONResponse, Response
from fastapi.encoders import jsonable_encoder
import os
import cloudinary
import cloudinary.uploader
from BitlyAPI import shorten_urls
import crud
from jwt import main_login, get_access_token, verify_password, refresh
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from emails import send_email, verify_token, send_password_reset_email, password_verif_token, send_successful_payment_email, send_failed_payment_email
from BitlyAPI import shorten_urls

from paystackapi.paystack import Paystack
from paystackapi.charge import Charge
from datetime import datetime

import stripe, json
from . import utility
from fastapi.responses import RedirectResponse

from dotenv import load_dotenv
load_dotenv()
from datetime import datetime
import time
from rave_python import Rave
import requests

import hashlib, hmac, http
order_router = APIRouter(
    prefix='/orders',
    tags=['orders'],
)

#Can be found in .env file at base directory
RAVE_PUBLIC_KEY = os.getenv("RAVE_PUBLIC_KEY")
SECRET_KEY = os.getenv('RAVE_SECRET_KEY')

payment_endpoint = "https://api.flutterwave.com/v3/payments"
header = {'Authorization':'Bearer '+ SECRET_KEY}


@order_router.post('/create_flutter_order', description="Create FlutterWave order for a user", status_code = 200)
async def create_order(userPayment: schema.PaymentBase, db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
    user_email = user.email
    user_name = user.first_name + " " + user.last_name
    company_id = user.company_id
    try:
        get_plan_details = crud.get_plan_by_name(db, userPayment.plan.lower())
        if get_plan_details is None:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "Sorry, we do not have that plan"}),
            )
             
        amount = get_plan_details.price * userPayment.minutes * 100
        if amount / 100 < 10:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "Sorry, minimum order you can place is $10"}),
            )
        
        data = {
            "tx_ref": str(company_id) + str(int(time.time())),
            "amount": amount / 100,
            "currency": "USD",
            "redirect_url": "https://heed.cx/paymentSuccess",
            "meta": {
                "customer_id": company_id,
                "customer_plan":  userPayment.plan,
                "minutes": userPayment.minutes,
                "per_price": get_plan_details.price
            },
            "customer": {
                "email": user_email,
                "name": user_name          
            }
        }
        get_link = requests.post(payment_endpoint, json=data, headers=header)
        get_link = get_link.json()
        autho_url = get_link['data']['link']
        
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    
    return {"detail": {
        "payment_url": autho_url,
        "gateway": "Flutterwave"
        }
    }
    
@order_router.post('/fwwebhook', include_in_schema=False)
async def heed_webhook_view(request: Request, db: Session = Depends(_services.get_session)):
    flutter_secret = os.getenv('FLUTTER_HOOK_KEY')
    payload = await request.body()
    
    signature = request.headers.get("verif-hash")
    if signature == None or (signature != flutter_secret):
        # This request isn't from Flutterwave; discard
        print("error")
        return HttpResponse(status=401)
    # It's a good idea to log all received events.
    # data = json.loads(body.decode())
    # event = data.get('event')
    # print(event)
    # get_data = json.loads(payload.decode('utf-8'))
    data_dict = json.loads(payload.decode('utf-8'))

    print(data_dict)
    
        
    
@order_router.post("/verify_flutter_order/{ref_code}", description="Verify Flutter order for a user", status_code = 200)
async def verify_order(ref_code: int, db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
    rave = Rave(RAVE_PUBLIC_KEY, SECRET_KEY)   
    user = crud.get_user_by_email(db, email=user.email)

    try:
        # add the verify url for flutter
        verify_url = "https://api.flutterwave.com/v3/transactions/{}/verify".format(ref_code)
        # Send the verify request
        response = requests.get(verify_url, headers=header)
        # Parse the response
        email = user.email
        response_json = json.loads(response.text)
        get_status = response_json['data']
        
        check_trans = crud.check_transaction(db, get_status['tx_ref'])

        

        get_date = get_status['created_at'].split("T")
        conv_date = get_date[1].split(".")[0]
        new_date1 = get_date[0] + " " + conv_date
        new_date2 = datetime.strptime(new_date1, "%Y-%m-%d %H:%M:%S")
        
        transaction = {"amount": get_status['amount'],
                       "trans_id": str(get_status['id']),
                       "reference": get_status['tx_ref'],
                       "minutes": get_status['meta']['minutes'],
                       "plan": get_status['meta']['customer_plan'],
                       "time_paid": new_date2,
                       "payment_channel": get_status['payment_type'],
                       "email_address": user.email,
                       "payment_gateway": "Flutterwave"
                    }
        
        card = {
            "card_type": get_status['card']['type'],
            "card_last_digit": get_status['card']['last_4digits'],
            "plan_per_price": get_status['meta']['per_price']
        }
        
        # merged the both dictionaries
        merged_dict = {**transaction, **card}
        
        # if already exist in the database.
        if check_trans is not None:
            return {"detail": merged_dict}
        
        if response_json['status'] != "success" or get_status['status'] != "successful":
            # send a mail receipt
            await send_failed_payment_email([email], user, 
                                                plan=transaction['plan'], 
                                                minutes=transaction['minutes'], 
                                                price=transaction['amount'])
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "Sorry, your payment failed, please try again"}),
            )
        
        
        #push the details into the database.
        trans_crud = crud.store_transaction(db, transaction)
        top_up_details = {"minutes": get_status['meta']['minutes'],
                       "plan": get_status['meta']['customer_plan']}
        # # top up the users account
        top_up = crud.top_up(db,user.email, top_up_details)
        # send a mail receipt
        await send_successful_payment_email([email], user, 
                                                plan=transaction['plan'], 
                                                minutes=transaction['minutes'], 
                                                price=transaction['amount'])
               
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
        
    return {
        "detail": merged_dict
    }

# @order_router.post("/create_order", description="Create Paystack order for a user", status_code = 200)
# async def create_order(userPayment: schema.PaymentBase, db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
#     paystack = Paystack(secret_key=os.getenv('PAYSTACK_SECRET_KEY'))
#     user_email = user.email
#     try:
#         # initialize a transaction.
#         trans = paystack.transaction()

#         # get amount for the plan.
#         get_plan_details = crud.get_plan_by_name(db, userPayment.plan.lower())
#         if get_plan_details is None:
#             return JSONResponse(
#                 status_code= 400,
#                 content=jsonable_encoder({"detail": "Sorry, we do not have that plan"}),
#             )
             
#         amount = get_plan_details.price * userPayment.minutes * 100
#         if amount/100 < 10:
#             return JSONResponse(
#                 status_code= 400,
#                 content=jsonable_encoder({"detail": "Sorry, minimum order you can place is $10"}),
#             )
        
#         # initialise the transaction
#         res = trans.initialize(email= user_email, amount = amount,
#                                metadata = {'minutes': userPayment.minutes, 'plan': userPayment.plan,
#                                            'cancel_action': "https://heed.cx/paymentFailure"},
#                                callback_url= "https://heed.cx/paymentSuccess")
        
#         if res['status'] == True:
#         # get the authorization url, access_code, and also the reference number.
#             autho_url = res['data']['authorization_url']
#             access_code = res['data']['access_code']
#             reference = res['data']['reference']
#         else:
#             return JSONResponse(
#                 status_code= 400,
#                 content=jsonable_encoder({"detail": "An error occured while trying to initialise payment, please try again"}),
#             )
         
#     except Exception as e:
#         return JSONResponse(
#             status_code= 500,
#             content=jsonable_encoder({"detail": str(e)}),
#         )
    
#     return {"detail": {
#         "payment_url": autho_url,
#         "gateway": "paystack"
#         }
#     }

# @order_router.post("/verify_order/{ref_code}", description="Verify Paystack order for a user", status_code = 200)
# async def verify_order(ref_code: str, db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
#     paystack = Paystack(secret_key=os.getenv('PAYSTACK_SECRET_KEY'))
#     user = crud.get_user_by_email(db, email=user.email)

#     try:
#         check_trans = crud.check_transaction(db, ref_code)
        
#         if check_trans is not None:
#             return {"detail": transaction}

            
#         veri = paystack.transaction().verify(reference = ref_code)
#         get_status = veri['data']
#         get_date = get_status['paid_at'].split("T")
#         conv_date = get_date[1].split(".")[0]
#         new_date1 = get_date[0] + " " + conv_date
#         new_date2 = datetime.strptime(new_date1, "%Y-%m-%d %H:%M:%S")
#         transaction = {"amount": get_status['amount']/100,
#                        "trans_id": str(get_status['id']),
#                        "reference": get_status['reference'],
#                        "minutes": get_status['metadata']['minutes'],
#                        "plan": get_status['metadata']['plan'],
#                        "time_paid": new_date2,
#                        "payment_channel": get_status['channel'],
#                        "email_address": user.email,
#                        "payment_gateway": "Paystack"
#                     }
        
#         if get_status['status'].strip().lower() != "success":
#             # send a mail receipt
#             # await send_transaction_failure_receipt([user.email], transaction)
#             await send_failed_payment_email([email], user, 
#                                                 plan=transaction['plan'], 
#                                                 minutes=transaction['minutes'], 
#                                                 price=transaction['amount'])
#             return JSONResponse(
#                 status_code= 400,
#                 content=jsonable_encoder({"detail": "Sorry, your payment failed, please try again"}),
#             )
        
        
#         #push the details into the database.
#         trans_crud = crud.store_transaction(db, transaction)
#         top_up_details = {"minutes": get_status['metadata']['minutes'],
#                        "plan": get_status['metadata']['plan']}
#         # top up the users account
#         top_up = crud.top_up(db,user.email, top_up_details)
#         # send a mail receipt
#         await send_successful_payment_email([email], user, 
#                                                 plan=transaction['plan'], 
#                                                 minutes=transaction['minutes'], 
#                                                 price=transaction['amount'])
#         # await send_transaction_success_receipt([user.email], transaction)
        
#     except Exception as e:
#         return JSONResponse(
#             status_code= 500,
#             content=jsonable_encoder({"detail": str(e)}),
#         )
        
#     return {
#         "detail": transaction
#     }

# paystack webhook.
@order_router.post('/paystack_webhook', include_in_schema=False)
async def heed_webhook_view(request: Request, db: Session = Depends(_services.get_session)):
    paystack_secret = os.getenv('PAYSTACK_SECRET_KEY')

    try:
        payload = await request.body()
        # get the header
        paystack_header = request.headers.get('x-paystack-signature')
        # convert data to dictionary.
        get_data = json.loads(payload.decode('utf-8'))
        signature = utility.generate_signature(paystack_secret, payload)
        if signature != paystack_header:
            return JSONResponse(
                status_code= 401,
                content=jsonable_encoder({"detail": "Authentication error"}),
            )

        # get the reference
        ref_code = get_data['data']['reference']
        check_trans = crud.check_transaction(db, ref_code)

        # get all the data need.
        get_status = get_data['data']
        get_date = get_status['paid_at'].split("T")
        conv_date = get_date[1].split(".")[0]
        new_date1 = get_date[0] + " " + conv_date
        new_date2 = datetime.strptime(new_date1, "%Y-%m-%d %H:%M:%S")
        transaction = {"amount": get_status['amount']/100,
                       "trans_id": str(get_status['id']),
                       "reference": get_status['reference'],
                       "minutes": get_status['metadata']['minutes'],
                       "plan": get_status['metadata']['plan'],
                       "time_paid": new_date2,
                       "payment_channel": get_status['channel'],
                       "email_address": get_status['customer']['email'],
                       "payment_gateway": "Paystack"
                    }
        user = crud.get_user_by_email(db, email=transaction['email_address'])
        email = transaction['email_address']
        if check_trans is not None:
            return {"detail": transaction}

        if get_data['event'] == "charge.success":
            # store in the crud database.
            trans_crud = crud.store_transaction(db, transaction)
            top_up_details = {"minutes": get_status['metadata']['minutes'],
                        "plan": get_status['metadata']['plan']}
            # top up the users account
            top_up = crud.top_up(db,user.email, top_up_details)
            # send a mail receipt
            await send_successful_payment_email([email], user, 
                                                plan=transaction['plan'], 
                                                minutes=transaction['minutes'], 
                                                price=transaction['amount'])

            # get the transaction details
        else:
            # an error must have occurred, send error mail.
            await send_failed_payment_email([email], user, 
                                                plan=transaction['plan'], 
                                                minutes=transaction['minutes'], 
                                                price=transaction['amount'])
            return JSONResponse(
                status_code= 404,
                content=jsonable_encoder({"detail": "Transaction failed!."}),
            )

    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        ) 
     
        
    return {
        "detail": transaction
    }


#stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
liveDomain = 'https://heed.cx/'


@order_router.post('/create-stripe-checkout-session', description="Create Stripe order for a user")
def create_stripe_order(userPayment: schema.PaymentBase, db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
    user_email = user.email
    get_plan_details = crud.get_plan_by_name(db, userPayment.plan.lower())

    if get_plan_details is None:
        raise HTTPException(status_code=400, detail="Sorry, we do not have that plan")

    unit_price = get_plan_details.price * 100
    units = int(userPayment.minutes)

    amount =  get_plan_details.price * units
    if amount < 10:
        raise HTTPException(status_code=400, detail="Sorry, the minimum order you can place is $10")

    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price_data': {
                        'currency' : 'usd',
                        'unit_amount' : int(unit_price),
                        'product_data' :{
                            'name': get_plan_details.name,
                        }
                    },

                    'quantity': units
                },
            ],
            mode='payment',
            metadata = {
                'plan': get_plan_details.name,
                'price_per_minute': unit_price,
                'minutes': units,
                'email': user_email

            },
            customer_email= user_email,
            success_url= liveDomain + 'stripe-order/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url= liveDomain + 'stripe-order/?canceled=true',
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    # print(checkout_session.url)
    # return RedirectResponse(checkout_session.url, status_code=303)
    print(checkout_session.url)
    return {"detail": {
        "payment_url": shorten_urls([checkout_session.url])[0].short_url,
        "gateway": "stripe"
        }
    }

#getting transaction details.
@order_router.get('/stripe-order-details/{session_id}', description="get detials of successful transaction")
def create_stripe_order(session_id: str, Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
    session = stripe.checkout.Session.retrieve(session_id)
    customer =session.customer_details
    if session.payment_status == 'paid':
        status = 'paid'
    else:
        status = 'processing'
    transaction = {'customer_name': customer.name,
                    'customer_email': customer.email,
                    'amount' : '$' + str(session.amount_total/100),
                    'plan': session.metadata.plan,
                    'minutes': session.metadata.minutes,
                    'price_per_minute':'$' + str(session.metadata.price_per_minute),
                    'status': status,
                    'payment_method': 'card(stripe)'
                    }
    return transaction

#webhook to handle all payments(successful, failed, declined) and fulfil order
@order_router.post('/webhook', include_in_schema=False)
async def heed_webhook_view(request: Request, stripe_signature: str = Header(str), db: Session = Depends(_services.get_session)):
    payload = await request.body()
    webhook_secret = os.getenv('STRIPE_WEBHOOK_KEY')
    event = None
    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, webhook_secret
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e.detail))
    # Invalid payload
    except stripe.error.SignatureVerificationError as e:
    # Invalid signature
        raise HTTPException(status_code=400, detail=str(e))

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        
        if session.payment_status == "paid":
        # Fulfill the purchase
            fulfill_order(db, session)
            await email_customer_about_successful_payment(db, session)
    elif event['type'] == 'checkout.session.async_payment_succeeded':
        session = event['data']['object']

        # Fulfill the purchase and email customer with details of top up
        fulfill_order(db, session)
        await email_customer_about_successful_payment(db, session)
        

    elif event['type'] == 'checkout.session.async_payment_failed':
        session = event['data']['object']

        # Send an email to the customer to let them know their transaction failed.
        await email_customer_about_failed_payment(db, session)

    return Response(status_code=200)

def fulfill_order(db, session):
    trans_id = session['id']
    amount = session['amount_subtotal']/100
    reference = session['payment_intent']
    payment_channel = session['payment_method_types'][0]
    minutes = session['metadata']['minutes']
    plan = session['metadata']['plan']
    email = session['metadata']['email']
    transaction = {"amount": amount,
                    "trans_id": trans_id,
                    "reference": reference,
                    "minutes": minutes,
                    "plan": plan,
                    "time_paid": datetime.now(),
                    "payment_channel": payment_channel,
                    "email_address": email,
                    "payment_gateway": "Stripe"
                    }
        
        #push the details into the database.
    trans_crud = crud.store_transaction(db, transaction)
    top_up_details = {"minutes": minutes,
                    "plan": str(plan)}
        # top up the users account
    top_up = crud.top_up(db,email, top_up_details)


#sends an email with the reference code to the customer if payment failed.
async def email_customer_about_failed_payment(db, session):
    reference = session['payment_intent']
    amount = session['amount_subtotal']/100
    minutes = session['metadata']['minutes']
    plan = session['metadata']['plan']
    email = session['metadata']['email']
    user = crud.get_user_by_email(db, email=email)
    await send_failed_payment_email([email], user, plan=plan, minutes=minutes, price=amount, reference=reference)
    
#sends an email with the top up details to the customer if payment succeeded.
async def email_customer_about_successful_payment(db, session):
    amount = session['amount_subtotal']/100
    minutes = session['metadata']['minutes']
    plan = session['metadata']['plan']
    email = session['metadata']['email']
    user = crud.get_user_by_email(db, email=email)
    await send_successful_payment_email([email], user, plan=plan, minutes=minutes, price=amount)

