# connection to database
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

import os

from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_PASS = os.getenv("DB_PASS")
DB_USER = os.getenv("DB_USER")

#DB_CONNECTION = DB_USER+":"+DB_PASS+"@"+DB_HOST+"/"+DB_NAME
#SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://"+DB_CONNECTION
SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args = {"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()