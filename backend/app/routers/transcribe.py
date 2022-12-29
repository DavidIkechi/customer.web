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
from routers.sentiment_utility import sentiment, sentiment_assembly
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import os
import crud
from emails import send_email, verify_token, send_password_reset_email, password_verif_token, send_freeTrial_email

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
async def view_transcript(transcript_id: Union[int, str], db: Session = Depends(_services.get_session)):
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
            return JSONResponse(
            status_code= 406,
            content=jsonable_encoder({"detail": "Your File Audio File Is Still Transcribing Please Hold On For A little While."})
            )
        else:
            # get the text.
            transcripted_word = transcript_audio['text']
            sentiment_result = sentiment_assembly(transcript_audio)

            negativity_score = sentiment_result['negativity_score']
            positivity_score = sentiment_result['positivity_score']
            neutrality_score = sentiment_result['neutrality_score']
            overall_sentiment = sentiment_result['overall_sentiment']
            most_negative_sentences = sentiment_result['most_negative_sentences']
            most_positive_sentences = sentiment_result ['most_positive_sentences']
            total_score = positivity_score + neutrality_score + negativity_score
            average_score = round((positivity_score/ total_score) * 10, 1)

    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )

    return {"transcription": transcripted_word,"most positive": most_positive_sentences,         
            "most_negative_score": most_negative_sentences,  
            "overall_sentiment_result": overall_sentiment,
            "average_score": average_score,
            "filename":current_status_filename, "filesize":current_status_size, 
            "status": transcript_audio['status']}



