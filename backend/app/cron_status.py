import crud
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from emails import transcription_result_email
from dotenv import load_dotenv
from datetime import datetime, timedelta

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
    # get all unsent mails.
    all_unsent = crud.get_all_unsent(db)
    for unsent in all_unsent:
        # get the distinct ids
        distinct_id = unsent.job_id
        job_status = unsent.job_status
        email = unsent.audio.user_audio.email
        user = unsent.audio.user_audio
        # check if the Job is completed.
        if job_status == "completed":
            # set the mail to true.
            get_job = crud.get_job_by_id(db, unsent.id)
            get_job.mail_sent = True
            db.commit()
            db.refresh(get_job)
        
        # check if all the jobs with the id have mail sent.
        if len(crud.get_all_job_sent(db, distinct_id)) == len(crud.get_all_job_with_id(db, distinct_id)):
            await transcription_result_email([email], user)


def due_for_deletion():
    db = initialize_db()
    users = crud.get_users(db)
    for user in users:
        if user.is_deactivated == True and user.deactivated_at is not None:
            deactivated_days = datetime.now() - user.deactivated_at
            if deactivated_days >=30:
                user.is_due_for_deletion = True
                db.commit()
        
# async def transcription_mail():
#     users = []
#     job_ids = []
#     db = initialize_db()
#     jobs = crud.get_jobs(db)
#     for job in jobs:
#         if job.job_status == "completed" and (job.mail_sent == False or job.mail_sent is None):
#             users.append(job.audio.user_id)
#             job_ids.append(job.job_id)

#     users = list(set(users))
#     job_ids = list(set(job_ids))
#     for i in users:
#         user = crud.get_user(db, i)
#         await transcription_result_email([user.email], user)
#         for j in job_ids:
#             jobs = crud.get_jobs_by_job_id(db, j)
#             for job in jobs:
#                 job.mail_sent = True
#                 db.commit()


