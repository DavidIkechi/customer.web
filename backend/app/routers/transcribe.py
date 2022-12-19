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
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
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

# ENDPOINT TO GET A PARTICULAR TRANSCRIPT USING THE AUDIO ID
@transcript_router.get("/{job_id}", description="Retrieving transcript by audio ID", status_code = 200)
def view_transcript(job_id: Union[int, str], db: Session = Depends(_services.get_session), 
                    current_user: Union[str , int] = Depends(auth.get_active_user)):
    try:
        user_id = current_user.id  
        sentiment_result = crud.analyse_and_store_audio(db, job_id, user_id)
    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )

    return {
        "detail": sentiment_result
    }

@transcript_router.get("/get_transcript/{transcript_id}", description="Retrieving transcript by audio ID", status_code = 200)
def view_transcript(transcript_id: Union[int, str], db: Session = Depends(_services.get_session)):
    transcript = crud.get_freetrial(db, id = transcript_id)
    if not transcript:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Transcription with id: {transcript_id} was not found")
    
    try:
        transcript_audio_id = transcript_id
        
        current_status = transcript.transcript_status.split(",")
        current_status_filename = current_status[1]
        current_status_size = current_status[2]
        transcript_audio = get_transcript_result(transcript_audio_id)
        transcript.job_status = transcript_audio['status']
        transcript.transcript_status = ",".join([transcript.job_status, current_status_filename, current_status_size])
        db.commit()
        db.refresh(transcript)
        
        if transcript_audio['status'] != "completed":
            return {"status":transcript_audio['status']}
        else:
            # get the text.
            transcripted_word = transcript_audio['text']
            sentiment_result = sentiment.sentiment(transcripted_word)

            overall_sentiment = sentiment_result['overall_sentiment']
    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )

    return {"transcription": transcripted_word, "overall_sentiment_result": overall_sentiment,
            "filename":current_status_filename, "filesize":current_status_size, 
            "status": transcript_audio['status']}



