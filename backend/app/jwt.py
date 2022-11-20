# from datetime import datetime, timedelta
# from typing import Union

# from fastapi import Depends, FastAPI, HTTPException, status
# from jose import JWTError, jwt
# from passlib.context import CryptContext
# from pydantic import BaseModel
# from sqlalchemy.orm import Session

# import models
# from crud import get_user_by_email
# # from db import engine, SessionLocal

# from dotenv import load_dotenv
# import os

# load_dotenv()

# #Can be found in .env file at base directory
# JWT_ACCESS_SECRET_KEY = os.getenv("JWT_ACCESS_SECRET_KEY")
# JWT_REFRESH_SECRET_KEY = os.getenv("JWT_REFRESH_SECRET_KEY")
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 5 #5 mins
# REFRESH_TOKEN_EXPIRE_MINUTES = 20 # 20 mins

# #Exceptions
# credentials_exception = HTTPException(
#     status_code=status.HTTP_401_UNAUTHORIZED,
#     detail="Could not validate credentials",
#     headers={"WWW-Authenticate": "Bearer"},
# )

# token_expired_exception = HTTPException(
#     status_code=status.HTTP_401_UNAUTHORIZED,
#     detail="Token expired",
#     headers={"WWW-Authenticate": "Bearer"},
# )

# user_not_found_exception = HTTPException(
#     status_code=status.HTTP_404_NOT_FOUND,
#     detail="User not found",
#     headers={"WWW-Authenticate": "Bearer"},
# )




# # Pydantic classes for type checking
# class Token(BaseModel):
#     access_token: str
#     refresh_token: str
#     token_type: str


# class TokenData(BaseModel):
#     email: Union[str, None] = None


# class User(BaseModel):
#     id: int
#     email: str
#     first_name: Union[str, None] = None
#     last_name: Union[str, None] = None
#     company_id: int


# class UserInDB(User):
#     hashed_password: str


# class RefreshToken(BaseModel):
#     refresh_token: str


# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



# app = FastAPI()

# # Compares password provided by user with stored password
# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)


# #Authenticates user with email and password
# def authenticate_user(db: Session, email: str, password: str):
#     user = get_user_by_email(db, email)
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False
#     return user

# #Creates access_token for jwt authentication
# def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, JWT_ACCESS_SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt


# #Creates refresh_token for jwt authentication
# def create_refresh_token(data: dict, expires_delta: Union[timedelta, None] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=1440)

#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, algorithm=ALGORITHM)
#     #code that saves encoded_jwt to database
#     return encoded_jwt


# # Function that returns jwt accesss token and refresh token
# async def main_login(form_data, db):
#     """
#     N.B: form_data is a parameter in your endpoint should depend on OAuth2PasswordRequestForm, i.e:
#             form_data: OAuth2PasswordRequestForm = Depends()
#     """


#     user = authenticate_user(db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect email or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     refresh_token_expires = timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.email}, expires_delta=access_token_expires
#     )
#     refresh_token = create_refresh_token(
#         data={"sub": user.email}, expires_delta=refresh_token_expires
#     )
#     return {"access_token": access_token,
#             "refresh_token": refresh_token,
#             "token_type": "bearer"}



# async def refresh(refresh_token, db):
#     """
#     refresh token is a parameter in your endpoint and should have a pydantic model RefreshToken, i.e:
#     class RefreshToken(BaseModel):
#         refresh_token:str
#     """

#     try:
#         payload = jwt.decode(refresh_token.refresh_token, JWT_REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
#         email:str = payload.get('sub')
#         exp_date: datetime = payload.get('exp')
#         if email is None or exp_date is None:
#             raise credentials_exception
#         token_data = TokenData(email=email)
#     except JWTError:
#         raise credentials_exception
#     user = get_user_by_email(db, email=token_data.email)
#     if user is None:
#         raise user_not_found_exception

