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
import os

load_dotenv()

def get_transcript(filename):
    header = {
        'authorization': os.getenv("ASSEMBLY_KEY"),
        'content-type': 'application/json'
    }
    upload_url = utils.upload_file(filename, header)
     # Request a transcription
    transcript_response = utils.request_transcript(upload_url, header)

    # Create a polling endpoint that will let us check when the transcription is complete
    polling_endpoint = utils.make_polling_endpoint(transcript_response)
    # Wait until the transcription is complete
    utils.wait_for_completion(polling_endpoint, header)

    # Request the paragraphs of the transcript
    paragraphs = utils.get_paragraphs(polling_endpoint, header)

    # Save and print transcript
    new_paragraph = ""
    for para in paragraphs:
        new_paragraph += para['text'] + " "

    return new_paragraph



transcript_router = APIRouter(
    prefix="/transcription",
    tags=["transcription"]
)


def transcribe_file(filename):
    # Create header with authorization along with content-type
   audio_to_word = get_transcript(filename)
    # Create header with authorization along with content-type
   audio_to_word = get_transcript(filename)
   return audio_to_word





# """ Please Note that these endpoints are subject to change as the query would be better suited to retrieve transcripts from the transcript table by transcript_id and
#     not Audio by audio_id.
#     If the transcript table is available, the code will be refractored to implement changes and queries to the transcript table """

# ENDPOINT TO GET A PARTICULAR TRANSCRIPT USING THE AUDIO ID
@transcript_router.get("/{job_id}", description="Retrieving transcript by audio ID")
def view_transcript(job_id: Union[int, str], db: Session = Depends(_services.get_session), current_user: Union[str , int] = Depends(auth.get_current_user)):
    Job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not Job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Job with id: {job_id} was not found")
    job_audio_id = Job.audio_id
    transcript_audio = db.query(models.Audio).filter(models.Audio.id == job_audio_id).first()
    transcript_text = transcript_audio.transcript
    return transcript_text


#ENDPOINT TO GET ALL TRANSCRIPTS AS A LIST
@transcript_router.get("/view_transcripts", response_model=List[schema.Audio], description="Retrieve all Transcripts")
def get_transcripts(db: Session = Depends(_services.get_session), current_user: Union[str , int] = Depends(auth.get_current_user), limit : int = 0, skip: int = 0, ):
    transcripts = db.query(models.Audio).filter(models.Audio.transcript).limit(limit).offset(skip).all()
    return transcripts



