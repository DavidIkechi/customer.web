from db import Base, engine, SessionLocal
from sqlalchemy.orm import Session

# database. 
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
