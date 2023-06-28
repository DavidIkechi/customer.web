# connection to database
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import cloudinary
import os
import logging

from dotenv import load_dotenv

load_dotenv()

# cloudinary config
cloudinary.config(
    cloud_name = os.getenv('CLOUD_NAME'),
    api_key = os.getenv('CLOUD_KEY'),
    api_secret = os.getenv('CLOUD_SECRET'),
    secure = True
)

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_PASS = os.getenv("DB_PASS")
DB_USER = os.getenv("DB_USER")

DB_CONNECTION = DB_USER+":"+DB_PASS+"@"+DB_HOST+"/"+DB_NAME
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://"+DB_CONNECTION

# SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:10of10in10@localhost/heed"

# SQLALCHEMY_DATABASE_URL = "sqlite:///./heetest.db"

# Enable SQLAlchemy logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
engine = create_engine(

    SQLALCHEMY_DATABASE_URL,
    pool_size=5,
    max_overflow=0,
    pool_recycle=120
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# @pytest.fixture(scope='function')
# def session(db):
#     connection = db.connect()
#     transaction = connection.begin()
#     session = sessionmaker(bind=connection)()
#     yield session
#     session.close()
#     transaction.rollback()
#     connection.close()
