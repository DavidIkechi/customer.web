import crud
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from emails import transcription_result_email, send_freeTrial_email
from dotenv import load_dotenv
from routers.transcribe import get_transcript_result

load_dotenv()

def initialize_db():
    DB_HOST = os.getenv("DB_HOST")
    DB_NAME = os.getenv("DB_NAME")
    DB_PASS = os.getenv("DB_PASS")
    DB_USER = os.getenv("DB_USER")

    DB_CONNECTION = DB_USER+":"+DB_PASS+"@"+DB_HOST+"/"+DB_NAME
    SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://"+DB_CONNECTION

    # SQLALCHEMY_DATABASE_URL = "sqlite:///./heetest.db"


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

            

async def send_free_email():
        db = initialize_db()
        details = crud.get_all_freeTrial(db)
        for transcript in details:
            get_transcript_id = transcript.transcript_id
            get_email = transcript.email
            
            current_status = transcript.transcript_status.split(",")
            current_status_filename = current_status[1]
            current_status_size = current_status[2]
            transcript_audio = get_transcript_result(get_transcript_id)
            transcript.job_status = transcript_audio['status']
            transcript.transcript_status = ",".join([transcript.job_status, current_status_filename, current_status_size])
            db.commit()
            db.refresh(transcript)
            
            if transcript_audio['status'] == "completed":
                # get the text.
                # transcripted_word = transcript_audio['text']
                # sentiment_result = sentiment_assembly(transcript_audio)

                # negativity_score = sentiment_result['negativity_score']
                # positivity_score = sentiment_result['positivity_score']
                # neutrality_score = sentiment_result['neutrality_score']
                # overall_sentiment = sentiment_result['overall_sentiment']
                # most_negative_sentences = sentiment_result['most_negative_sentences']
                # most_positive_sentences = sentiment_result ['most_positive_sentences']
                # total_score = positivity_score + neutrality_score + negativity_score
                # average_score = round((positivity_score/ total_score) * 10, 1)
                
                await send_freeTrial_email([get_email], transcript)
                transcript.mail_sent = True
                db.commit()
                db.refresh(transcript)
        
        
