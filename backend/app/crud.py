# crud operations for the backend app
from sqlalchemy.orm import Session
import models, schema
from random import randint
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_company(db: Session, company_name: str, id: int):
    db_company = models.Company(id= id, name=company_name)
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

def create_user(db: Session, user: schema.User):
    # get a random id
    company_id = randint(0, 1000000)
    while (get_company(db, company_id) is not None):
        company_id = randint(0, 1000000)
    
    # create the company.
    create_company(db, user.company_name, company_id)
    # create the user.
    db_user = models.User(first_name=user.first_name, last_name=user.last_name, email=user.email, password=pwd_context.hash(user.password), company_id = company_id)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_audio(db: Session, audio_id: int):
    return db.query(models.Audio).filter(models.Audio.id == audio_id).first()

def get_audios(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Audio).offset(skip).limit(limit).all()

def get_company(db: Session, company_id: int):
    return db.query(models.Company).filter(models.Company.id == company_id).first()

def create_audio(db: Session, audio: schema.Audio, agent_id: int):
    db_audio = models.Audio(audio_path=audio.audio_path, transcript=audio.transcript, timestamp=audio.timestamp, positivity_score=audio.positivity_score, 
    negativity_score=audio.negativity_score, neutrality_score=audio.neutrality_score, overall_sentiment=audio.overall_sentiment, agent_id=agent_id)
    db.add(db_audio)
    db.commit()
    db.refresh(db_audio)
    return db_audio

def get_job(db: Session, job_id: int):
    return db.query(models.Job).filter(models.Job.id == job_id).first()

def get_jobs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Job).offset(skip).limit(limit).all()

def create_job(db: Session, job: schema.Job, audio_id: int):
    db_job = models.Job(timestamp=job.timestamp, job_status=job.job_status, audio_id=audio_id)
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

def get_audio_by_agent_id(db: Session, agent_id: int):
    return db.query(models.Audio).filter(models.Audio.agent_id == agent_id).all()

def get_agent(db: Session, agent_id: int):
    return db.query(models.Agent).filter(models.Agent.id == agent_id).first()

def get_agents_by_company_id(db: Session, company_id: int):
    return db.query(models.Agent).filter(models.Agent.company_id == company_id).all()

def create_agent(db: Session, agent: schema.Agent, user_id: int):
    db_agent = models.Agent(first_name=agent.first_name, last_name=agent.last_name, company_id=user_id)
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent

