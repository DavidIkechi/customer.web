# import all the necessary libraries for the Auth class.
from fastapi.security import OAuth2PasswordBearer
from fastapi import status, HTTPException, Depends
from crud import get_user_by_email
from jose import jwt
import os
import services as _services

from dotenv import load_dotenv
from jwt import (
    TokenData,
    Token
)
from sqlalchemy.orm import Session
# load environment variables
load_dotenv()
# set some constants
# JSON web token secret key
JWT_ACCESS_SECRET_KEY = os.getenv("JWT_ACCESS_SECRET_KEY")
ALGORITHM = "HS256"


# Create an instance of the OAuth
oauth2_scheme = OAuth2PasswordBearer(tokenUrl = 'login')

# Exception for invalid credentials
credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

# validate the token to get the current user.
async def get_current_user(db: Session = Depends(_services.get_session), token: str = Depends(oauth2_scheme)):
    """ This function gets the current user from the access token provided.

    Args:
        db (Session, optional): A session of the created database.
        token (str, optional): A string which represents the created or stored token generated after a user must have been logged in.

    Raises:
        credentials_exception: A dictionary which represents the exception caught when there is a mismatch or failure.

    Returns:
        A Json representing the value of the user retrieved from the database after proper validation or check.
    """
    try:
        payload = jwt.decode(token, JWT_ACCESS_SECRET_KEY, algorithms=ALGORITHM)
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    
    # query database to get the user email
    user = get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    # return the current user.
    return user

async def get_active_user(db: Session = Depends(_services.get_session), token: str = Depends(oauth2_scheme)) -> bool:
    """ This function checks if a user is active.

    Args:
        db (Session, optional): A session of the created database.
        token (str, optional): A string which represents the created or stored token generated after a user must have been logged in.

    Raises:
        credentials_exception: A dictionary which represents the exception caught when there is a mismatch or failure.

    Returns:
        A boolean that tells if the user is active.
    """
    # get the user email from the database.
    user_email = await get_current_user(db, token)
    if not user_email.is_active:
        raise HTTPException(
            status_code=status.HTTP_423_LOCKED,
            detail="User is not active",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user_email.is_active

async def get_admin(db: Session = Depends(_services.get_session), token: str = Depends(oauth2_scheme)) -> bool:
    """ This function checks if a user is admin.

    Args:
        db (Session, optional): A session of the created database.
        token (str, optional): A string which represents the created or stored token generated after a user must have been logged in.

    Raises:
        credentials_exception: A dictionary which represents the exception caught when there is a mismatch or failure.

    Returns:
        A boolean that tells if the user is admin.
    """
    # get the user email from the database.
    user_email = await get_current_user(db, token)
    # if the user is not admin.
    if not user_email.is_admin:
        raise HTTPException(
            status_code=status.HTTP_423_LOCKED,
            detail="User is not an admin",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # if the user is an admin
    else:
    # admin but not active
        if not user_email.is_active:
            raise HTTPException(
                status_code=status.HTTP_423_LOCKED,
                detail="Admin Account not active",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    return user_email.is_admin

         