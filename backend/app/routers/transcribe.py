import utils
import auth
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Union, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import services as _services
import models, schema
from . import utility as utils
from dotenv import load_dotenv
from . import sentiment
import os
import crud

load_dotenv()

def get_transcript(upload_url):
    header = {
        'authorization': os.getenv("ASSEMBLY_KEY"),
        'content-type': 'application/json'
    }
    transcript_response = utils.request_transcript(upload_url, header)

    return transcript_response

def get_transcript_result(transcript_id: str):
    header = {
        'authorization': os.getenv("ASSEMBLY_KEY"),
        'content-type': 'application/json'
    }
    # Create a polling endpoint that will let us check when the transcription is complete
    polling_endpoint = utils.make_polling_endpoint(transcript_id)
    get_poll_result = utils.get_result(polling_endpoint, header)
    
    return get_poll_result.json()
    
    

transcript_router = APIRouter(
    prefix="/transcription",
    tags=["transcription"]
)


def transcribe_file(file_url):
    # Create header with authorization along with content-type    # Create header with authorization along with content-type
   audio_to_word = get_transcript(file_url)
   return audio_to_word





# """ Please Note that these endpoints are subject to change as the query would be better suited to retrieve transcripts from the transcript table by transcript_id and
#     not Audio by audio_id.
#     If the transcript table is available, the code will be refractored to implement changes and queries to the transcript table """

# ENDPOINT TO GET A PARTICULAR TRANSCRIPT USING THE AUDIO ID
@transcript_router.get("/{job_id}", description="Retrieving transcript by audio ID")
def view_transcript(job_id: Union[int, str], db: Session = Depends(_services.get_session), current_user: Union[str , int] = Depends(auth.get_active_user)):
    user_id = current_user.id

    Job = db.query(models.Audio).filter(models.Audio.job_id == job_id).first()
    if not Job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Job with id: {job_id} was not found")
    job_audio_id = job_id
    audio_id = Job.id
    
    
    transcript_audio = get_transcript_result(job_audio_id)
    db_job = db.query(models.Job).filter(models.Job.audio_id == audio_id).first()
    db_job.job_status = transcript_audio['status']
    db.commit()
    
    if transcript_audio['status'] != "completed":
        return {
            "status":transcript_audio['status']
        }
        
    # get the text.
    transcripted_word = transcript_audio['text']
    sentiment_result = sentiment.sentiment(transcripted_word)

    negativity_score = sentiment_result['negativity_score']
    positivity_score = sentiment_result['positivity_score']
    neutrality_score = sentiment_result['neutrality_score']
    overall_sentiment = sentiment_result['overall_sentiment']
    most_negative_sentences = sentiment_result['most_negative_sentences']
    most_positive_sentences = sentiment_result ['most_postive_sentences']
    total_score = positivity_score + neutrality_score + negativity_score
    average_score = round((positivity_score/ total_score) * 10, 1)
    
    db_audio = db.query(models.Audio).filter(models.Audio.job_id == job_id).first()
    db_audio_id = db_audio.id
    db_audio_url = db_audio.audio_path
    db_audio_filename = db_audio.filename
    db_audio_size = db_audio.size
    db_audio_duration = db_audio.duration

    db_audio.transcript, db_audio.positivity_score = transcripted_word, positivity_score
    db_audio.negativity_score, db_audio.neutrality_score=negativity_score, neutrality_score
    db_audio.overall_sentiment, db_audio.most_negative_sentences=overall_sentiment, most_negative_sentences 
    db_audio.most_positive_sentences = most_positive_sentences
    db_audio.average_score = average_score
    db.commit()

    db_agent = db.query(models.Agent).filter(models.Agent.aud_id == db_audio_id).first()
    agent_name = db_agent.first_name + " "+ db_agent.last_name
    
    history_create: schema.HistoryCreate = {"user_id":user_id,
                                            "sentiment_result":overall_sentiment,
                                            "agent_name": agent_name,
                                            "audio_name": db_audio_filename}

    crud.create_history(db, history_create)
    other_details = {
        "audio_url": db_audio_url,
        "audio_size": db_audio_size,
        "audio_duration": db_audio_duration,
        "audio_filename": db_audio_filename
    }
    
    sentiment_result.update(other_details)

    return {"sentiment_result": sentiment_result}

# #ENDPOINT TO GET ALL TRANSCRIPTS AS A LIST
# @transcript_router.get("/view_transcripts", response_model=List[schema.Audio], description="Retrieve all Transcripts")
# def get_transcripts(db: Session = Depends(_services.get_session), current_user: Union[str , int] = Depends(auth.get_current_user), limit : int = 0, skip: int = 0, ):
#     transcripts = db.query(models.Audio).filter(models.Audio.transcript).limit(limit).offset(skip).all()
#     return transcripts



