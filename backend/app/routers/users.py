from fastapi import FastAPI, status, Depends, APIRouter,  UploadFile, File, Form, Query, Request, HTTPException
from typing import List, Union, Optional
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


user_router = APIRouter(
    prefix='/users',
    tags=['users'],
)

# endpoint for user login
@user_router.post('/login', summary = "create access token for logged in user",
                  status_code= status.HTTP_200_OK)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(_services.get_session)):
    # return token once the user has been successfully authenticated, or it returns an error.
    return await main_login(form_data, db)


# creating a users account.
@user_router.post("/create_users", status_code= status.HTTP_201_CREATED, 
                  summary = "create/register a new user user")
async def create_user(user: schema.UserCreate, db: Session = Depends(_services.get_session)):
    db_user = crud.get_user_by_email(db, email=user.email)
    # if user exists, throw an exception.
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # check if email exists and is valid
    email_exists = utils.validate_and_verify_email(user.email)
    if not email_exists:
        return JSONResponse(
            status_code=400,
            content = jsonable_encoder({"detail": "User email couldnot be verified!, please use a proper email"})
        )
    # create the user before sending a mail.
    new_user = crud.create_user(db=db, user=user)
    await send_email([user.email], user)
        
    return {    
        "detail" : "Account was successfully created."
    }

@user_router.post("/resend_verify_email", status_code= status.HTTP_200_OK, summary = "Resend verify user email")
async def resend_verify_email(email_address: schema.Newsletter, db: Session = Depends(_services.get_session)):
    try:  
        email_address = email_address.email      
        users = crud.get_user_by_email(db, email=email_address)
        if users is None:
            return JSONResponse(
                status_code= 400,
                content=jsonable_encoder({"detail": "Sorry!, no user with such email address!"}),
            )
        await send_email([email_address], users)
    
    except Exception as e:
       return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {      
        "detail": f"verification mail for {users.first_name} was sent successfully"
    }

# get all users, only available for the admin end.
@user_router.get("/get_all_users", summary = "get all users", status_code= 200)
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(_services.get_session), 
               user: models.User = Depends(auth.get_admin)):
    try:
        users = crud.get_users(db, skip=skip, limit=limit)
    except Exception as e:
       return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {      
        "detail": users
    }
    
@user_router.get("/get_user/{user_id}", summary = "get user by id", status_code=200, response_model=schema.User)
def read_user(user_id: int, db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_admin)):
    try:
        db_user = crud.get_user(db, user_id=user_id)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    
    return {
        "detail": db_user
    }
    
@user_router.patch("/update_profile", summary="Update user profile details", status_code=status.HTTP_200_OK)
def update_profile( 
                   firstname:Optional[str] = Form(None), 
                   lastname:Optional[str] = Form(None), 
                   company_name: Optional[str] = Form(None), 
                   company_address:Optional[str] = Form(None), 
                   phone_number: Optional[str] = Form(None), 
                   db:Session = Depends(_services.get_session), 
                   current_user:schema.User = Depends(auth.get_active_user),
                  image_file: Optional[UploadFile] = File(None, description="Company Profile Image/Logo")):
    user_profile = db.query(models.UserProfile).filter(models.UserProfile.id == current_user.id).first()
    if user_profile is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"The Profile for user with id {current_user.id} does not exist")
        
    if user_profile.id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN , 
                                    detail="Not authorized to perform requested action")
        
    user = db.query(models.User).filter(models.User.id == user_profile.id).first()
    company = db.query(models.Company).filter(models.Company.id == user.company_id).first()
    field_names = [company_name, company_address, phone_number, firstname, lastname, image_file]
    for field in field_names:
        if field == None:
            pass
        elif field is company_name:
            company.name = company_name
        elif field is company_address:
            user_profile.company_address = company_address
        elif field is phone_number:
            user_profile.phone_number = phone_number
        elif field is firstname:
            user.first_name = firstname  
        elif field is lastname:
           user.last_name = lastname
        else:
            try:
                image_response = cloudinary.uploader.upload(image_file.file)
                image_url = image_response.get("secure_url") 
                user_profile.company_logo_url = image_url        
            except Exception:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="There was an error uploading the file")

    db.commit() 
    db.refresh(company)
    db.refresh(user_profile)
    return {
        "detail": user_profile
    }
    

@user_router.get('/verification', summary = "verify a user by email", status_code = status.HTTP_200_OK)
async def email_verification(request: Request, token: str, db: Session = Depends(_services.get_session)):
    try:
        user = await verify_token(token, db)
        if user and not user.is_active:
            user.is_active = True
            user.is_verified = True
            db.commit()
            return{
                "detail" : f"Hello {user.first_name}, your account has been successfully verified"
                }
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
        
    return {
        "detail" : f"Hello {user.first_name}, you already have an active account with Heed!"
    }
    
    
@user_router.get("/account", summary = "get user profile details", status_code = 200)
async def my_profile (db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
    user_id = user.id
    try:
        return {"detail": crud.get_user_profile(db, user_id)}
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )



@user_router.post('/forgot-password', summary = "get token for password reset", status_code = 200)
async def forgot_password(email: schema.ForgetPassword, db: Session = Depends(_services.get_session)):
    
    try:
        user: models.User = crud.get_user_by_email(db, email.email)
        if user is None:
            return JSONResponse(
                status_code= status.HTTP_400_BAD_REQUEST,
                content=jsonable_encoder({"detail": "User not found"}),
            )        
        token = await send_password_reset_email([email.email], user)
    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {"detail": token}
    

@user_router.patch('/reset-password', summary = "reset password", status_code = 200)
async def reset_password(token: str, new_password: schema.UpdatePassword, db: Session = Depends(_services.get_session)):
    
    try:
        email = password_verif_token(token)
        user: models.User = crud.get_user_by_email(db, email)
            
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

        its_match = verify_password(new_password.password, user.password)
        its_le_eight = len(new_password.password) < 8

        if its_match:
            raise HTTPException(status_code=500, detail="New password cannot be the same as old password")
        elif its_le_eight:
            raise HTTPException(status_code=500, detail="Password must have at least 8 characters")

        
        reset_done = crud.reset_password(db, new_password.password, user)

        if reset_done is None:
            raise HTTPException(status_code=500, detail="Failed to update password")
        
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    
    return {
        "detail":reset_done
        }



@user_router.patch('/change-password', summary = "change password", status_code = 200)
async def change_password(password_schema: schema.ChangePassword, 
                          db: Session = Depends(_services.get_session), user: models.User = Depends(auth.get_active_user)):
    try:
        its_match = password_schema.old_password == password_schema.new_password
        its_le_eight = len(password_schema.new_password) < 8

        if its_match:
            raise HTTPException(status_code=500, detail="New password cannot be the same as old password")
        elif its_le_eight:
            raise HTTPException(status_code=500, detail="Password must have at least 8 characters")

        user_db = crud.get_user_by_email(db, user.email)

        if user_db is None:
            raise HTTPException(status_code=404, detail="User not found")

        password_match =  verify_password(password_schema.old_password, user_db.password)

        if not password_match:
            raise HTTPException(status_code=400, detail="Password does not match")
        
        reset_done = crud.reset_password(db, password_schema.new_password, user_db)

        if reset_done is None:
            raise HTTPException(status_code=400, detail="Failed to update password")
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    
    return {
        "detail": reset_done
    }
    
@user_router.post('/refresh-token', summary = "refresh expired access token of logged in user")
async def refresh_token(refresh_token: schema.RefreshToken, db: Session = Depends(_services.get_session)):
    # return new access token for logged in user once it has verified the refresh token sent from the frontend.
    try:
        return {"detail": refresh(refresh_token, db)}
    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )
        
    
@user_router.get('/auth/google', status_code = 200)
async def auth(email: str, db: Session = Depends(_services.get_session)):
    try:
        user_db = crud.get_user_by_email(db, email)

        if user_db is None:
            return JSONResponse(
                status_code= 404,
                content=jsonable_encoder({"detail": "User not found!"}),
            )

        tokens = get_access_token(email)
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {
        "detail": tokens
    }

@user_router.get("/refresh-api-key", status_code = 200)
async def refresh_api_key(user: models.User = Depends(get_active_user), db: Session = Depends(_services.get_session)):
    try:
        user_id = user.id
        return {
            "detail": crud.refresh_api_key(db, user_id)
        }
    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )


@user_router.get('/history', summary = "get user history", response_model=Page[schema.History], status_code = 200)
async def get_history(user: models.User = Depends(get_active_user),
                      db: Session = Depends(_services.get_session), params: Params = Depends()):
    try:
        user_history = paginate(crud.get_history_by_user_id(db, user.id), params)
        if not user_history:
                raise HTTPException(
                status_code=404,
                detail="The user's history doesn't exist",
            )
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {
        "detail": user_history
    }

@user_router.post("/newsletter-subscription", summary="newsletter subscription", 
                  response_model= schema.Newsletter, status_code = 200)
def subscribe_to_newletter(subscriber: schema.Newsletter, db: Session = Depends(_services.get_session)):
    db_subscriber = crud.check_subscrition_email(db,email=subscriber.email)

    if db_subscriber:
        raise HTTPException(status_code=400, detail="You are already subscribed to our newsletter")
    try:
        crud.add_newsletter_subscriber(db=db, subscriber=subscriber)
        return {
            "detail": subscriber
        }
    except:
        raise HTTPException(status_code=500, detail="An unknown error occured. Try Again") 

@user_router.get("/get_newsletter-subscribers", summary="Get all existing subscribers", response_model=list[schema.Newsletter],
                 status_code = 200)
def get_subscribers(skip: int = 0, db: Session = Depends(_services.get_session), user: models.User = Depends(get_admin)):
    try:
        subscribers = crud.get_newsletter_subscribers(db, skip=skip)
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
        
    return {
        "detail": subscribers
    }


@user_router.post("/deactivate_user")
async def deactivate(db: Session = Depends(_services.get_session), user: models.User = Depends(get_active_user)):
    try:
        user_email = user.email
        db_user = crud.get_user_by_email(db, email=user.email)
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")

        if db_user.is_active == False:
            raise HTTPException(status_code=400, detail="This User Is Not Active")
        db_user.is_active = False
        db_user.is_deactivated = True
        db_user.deactivated_at = datetime.now()
        db.commit()
        await send_deactivation_email([user_email], db_user)

    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
        
    return {
        "detail": "User Deactivated"
    }

    
@user_router.delete("/delete_user/{user_id}", status_code = 200)
async def delete_user(user_id: int, db: Session = Depends(_services.get_session), user: models.User = Depends(get_admin)):
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
            
        if db_user.is_super_admin or db_user.is_admin:
            return JSONResponse(
                status_code=400,
                content = jsonable_encoder({"detail": "You can not delete an admin or super admin account"})
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
       
@user_router.post("/reactivate_user/{user_id}", status_code = 200)
async def reactivate_user(user_id: int, db: Session = Depends(_services.get_session), user: models.User = Depends(get_admin)):
    try:
       # first check if the user account exists at first.
        db_user = crud.get_user(db, user_id)
        user_email = db_user.email
        
        if db_user is None:
            raise HTTPException(status_code=404, 
                                detail="User not found")
        # delete the user account
        db_user.is_active = True
        db_user.is_deactivated = False
        db.commit()
        # await send_reactivation_email([user_email], db_user)
        
    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        )
        
    return {
        "detail": "User Account was successfully Reactivated!"
    }    

