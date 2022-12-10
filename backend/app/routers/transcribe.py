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
    
    sentiment_result = crud.analyse_and_store_audio(db, job_id, user_id)

    return sentiment_result



