# crud operations for the backend app
from sqlalchemy.orm import Session
from fastapi import HTTPException, status, UploadFile, File, Depends, Response
import models, schema
from random import randint
from passlib.context import CryptContext
from fastapi import HTTPException 
import shutil

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
    create_user_profile(db, company_id, user.email)
    return db_user

def update_user(db: Session, user: schema.user_update, user_id: int):
    # Getting the current user
    db_user = get_user(
        db = db,
        user_id=user_id
        )
    if not db_user:
        raise HTTPException(status_code=404, detail="user not found")
    user_data = user.dict(exclude_unset=True)
    for key, value in user_data.items():
            setattr(db_user, key, value)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_profile(db:Session, profile:schema.UserProfileUpdate, user_id:int):
    user_profile = db.query(models.UserProfile).filter(models.UserProfile.id == user_id).first()
    if user_profile is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"The Profile for user with id {user_id} does not exist")
        
    if user_profile.id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN , 
                                    detail="Not authorized to perform requested action")
    user_profile.phone_number = profile.phone_number
    user_profile.company_address = profile.company_address
    user_profile.company_logo_url = profile.company_logo_url
    db.commit()
    db.refresh(user_profile)
    return user_profile

def upload_user_image(db:Session , user_id:int, image_file:UploadFile):
    user_profile = db.query(models.UserProfile).filter(models.UserProfile.id == user_id).first()
    file_location = f"media/{image_file.filename}"
    with open(file_location ,"wb") as profile_img:
        shutil.copyfileobj(image_file.file, profile_img)
    image_url = str(f"media/{image_file.filename}")
    user_profile.company_logo_url = image_url
    db.commit()
    db.refresh(user_profile)
    return {"image_url": image_url}

    
def delete_user(db: Session, user_id: int, current_user):
    deleted_user = db.query(models.User).filter(models.User.id == user_id).first()
    if deleted_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"The user with id {user_id} does not exist")
    if user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN , 
                                detail="Not authorized to perform requested action")
        
    user_profile= db.query(models.UserProfile).filter(models.UserProfile.id == deleted_user.id).first()
    db.delete(deleted_user)
    db.delete(user_profile)
    db.commit()
    return {"message":f"User with id{deleted_user.id} has been deleted"}


def get_audio(db: Session, audio_id: int):
    return db.query(models.Audio).filter(models.Audio.id == audio_id).first()

def get_audios(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Audio).offset(skip).limit(limit).all()

def get_audios_by_user(db: Session, user_id: int):
    return db.query(models.Audio).filter(models.Audio.user_id == user_id).all()

def get_company(db: Session, company_id: int):
    return db.query(models.Company).filter(models.Company.id == company_id).first()

def create_audio(db: Session, audio: schema.Audio, agent_id: int):
    db_audio = models.Audio(audio_path=audio.audio_path, size=audio.size, duration=audio.duration, transcript=audio.transcript, timestamp=audio.timestamp, positivity_score=audio.positivity_score,
    negativity_score=audio.negativity_score, neutrality_score=audio.neutrality_score, overall_sentiment=audio.overall_sentiment, most_positive_sentences =audio.most_positive_sentences, most_negative_sentences = audio.most_negative_sentences, agent_id=agent_id, agent_firstname = db_audio.agent_firstname, agent_lastname = db_audio.agent_lastname)

    db.add(db_audio)
    db.commit()
    db.refresh(db_audio)
    return db_audio

def get_jobs_uploaded(db:Session, current_user, skip: int = 0, limit: int = 0):
    job_list = []
    all_audios = get_audios_by_user(db, user_id=current_user.id)
    for audio in all_audios:
        new_data = {"transcript_id" :audio.job_id,
                    "job_status":audio.job.job_status,
                    "agent_name":f"{audio.agent_firstname} {audio.agent_lastname}",
                    "audio_url" :audio.audio_path
                    }
        
        job_list.append(new_data)
    return job_list

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

def create_agent(db: Session, agent: schema.AgentCreate, company_id: int):
    db_agent = models.Agent(first_name=agent.first_name, last_name=agent.last_name, company_id=company_id)
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent


def create_history(db: Session, history: schema.HistoryCreate):
    db_history = models.History(**history)
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return db_history


def get_history_by_user_id(db: Session, user_id: int):
    return db.query(models.History).filter(models.History.user_id == user_id).all()



def create_analysis(db, result= schema.Audio, user_id=int):
    db_analysis = models.Audio(transcript = result.transcript, positivity_score= result.positivity_score, negativity_score= result.negativity_score, overall_sentiment= result.overall_sentiment)
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    return db_analysis

def get_analysis(db: Session, analysis_id = int):
    return db.query(models.Analysis).filter(models.Analysis == analysis_id).first()

def create_user_profile(db: Session, company_id: int, user_email: str):
    user = get_user_by_email(db, user_email)
    user_id = user.id
    db_profile = models.UserProfile(id=user_id, company_id = company_id)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

def get_user_profile(db: Session, user_id: int):
    agents = []
    user_profile = db.query(models.UserProfile).filter(models.UserProfile.id == user_id).first()
    company = db.query(models.Company).filter(models.Company.id ==user_profile.company_id).first()
    user = db.query(models.User).filter(models.User.id == user_id).first()
    for agent in db.query(models.Agent).filter(models.Agent.company_id == user_profile.company_id).all():
        agents.append(agent.first_name + " " + agent.last_name)

    return {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "company_name": company.name,
        "agents": agents,
        "phone_number": user_profile.phone_number,
        "email": user.email,
        "company_address": company.address,
        "company_logo_url": user_profile.company_logo_url,
        "api_key": user_profile.api_key
    }

def get_user_profile_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def reset_password(db: Session, password: str, user: models.User):

    user.password = pwd_context.hash(password)

    db.add(user)
    db.commit()
    db.refresh(user)
    return user



