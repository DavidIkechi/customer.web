import requests
from . import utility as utils
from dotenv import load_dotenv
import os

load_dotenv()

def transcribe_file(filename):
    # Create header with authorization along with content-type
   audio_to_word = get_transcript(filename)
   
   return audio_to_word 
    
    
    
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