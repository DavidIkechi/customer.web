from fastapi import FastAPI, HTTPException, status, Depends
from sqlalchemy.orm import Session
from db import Base, engine, SessionLocal
import crud

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/tryForFree/{user_id}")
async def try_free(user_id: int, db: Session = Depends(get_db)):
    userDetails = crud.get_user(db, user_id=user_id)
    return if not userDetails:
        raise HTTPException(
            status_code=status.HTTP_423_LOCKED,
            detail="Cannot Use This Service, Please Register And Subscribe"
        )
