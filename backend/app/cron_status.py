import crud
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from emails import transcription_result_email
from dotenv import load_dotenv

load_dotenv()

def initialize_db():
    DB_HOST = os.getenv("DB_HOST")
    DB_NAME = os.getenv("DB_NAME")
    DB_PASS = os.getenv("DB_PASS")
    DB_USER = os.getenv("DB_USER")

    DB_CONNECTION = DB_USER+":"+DB_PASS+"@"+DB_HOST+"/"+DB_NAME
    SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://"+DB_CONNECTION

    #SQLALCHEMY_DATABASE_URL = "sqlite:///./heetest.db"


    engine = create_engine(

        SQLALCHEMY_DATABASE_URL#, connect_args = {"check_same_thread": False}

    )

    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    return SessionLocal()

    


def check_and_update_jobs():
    db = initialize_db()
    jobs = crud.get_queued_jobs(db)
    # get the Job id which matches with the audio id.
    for job in jobs:
        get_job_id = job.audio_id

        # get the Job id which matches with the audio id.
        get_audios = crud.get_audio(db, get_job_id)
        if get_audios is not None:
            
            transcript_id = get_audios.job_id
            user = get_audios.user_id
            result = crud.analyse_and_store_audio(db, transcript_id, user)


async def transcription_mail():
    db = initialize_db()
    jobs = crud.get_jobs(db)
    users = crud.get_users(db)

    false_job = dict()
    for user in users:
        this_list = []
        for job in jobs:
            get_job_id = job.job_id
            audios = crud.get_audios_by_user(db, user.id)
            for i in audios:
                if i.job.job_id == get_job_id:
                    audio = i
            if user.id == audio.user_id:
                get_job = crud.get_job(db, audio.job.id)
                if get_job.job_status == "completed" and get_job.mail_sent == False:
                    this_list.append(get_job_id)
                    false_job[str(user.id)] = this_list
                    
    if len(false_job) > 0:
        for item in false_job:
            user = crud.get_user(db, item)
            email = user.email
 
            await transcription_result_email([email], user)

            for j in false_job[item]:
                jobs = crud.get_jobs_by_job_id(db, j)
                for i in jobs:
                    i.mail_sent = True
                    db.commit()
            
        
        
