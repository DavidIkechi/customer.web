import requests
import time
from fastapi import HTTPException
import boto3
from botocore.exceptions import ClientError
import logging
import requests
import time
from fastapi import FastAPI, status, Depends, APIRouter,  UploadFile, File, Form, Query, Request, HTTPException
import pandas as pd
import hashlib, hmac, http
import os

from dotenv import load_dotenv
from email_validate import validate
from audio import audio_details

load_dotenv()


upload_endpoint = "https://api.assemblyai.com/v2/upload"
transcript_endpoint = "https://api.assemblyai.com/v2/transcript"


# Helper for `upload_file()`
def _read_file(filename, chunk_size=5242880):
    with open(filename, "rb") as f:
        while True:
            data = f.read(chunk_size)
            if not data:
                break
            yield data

# Request transcript for file uploaded to AAI servers
def request_transcript(upload_url, header):
    transcript_request = {
        'audio_url': upload_url,
        'sentiment_analysis': True

    }
    transcript_response = requests.post(
        transcript_endpoint,
        json=transcript_request,
        headers=header
    )
    return transcript_response.json()


# Make a polling endpoint
def make_polling_endpoint(transcript_response):
    polling_endpoint = "https://api.assemblyai.com/v2/transcript/"
    polling_endpoint += transcript_response
    return polling_endpoint


# Wait for the transcript to finish
def wait_for_completion(polling_endpoint, header):
    while True:
        polling_response = requests.get(polling_endpoint, headers=header)
        polling_response = polling_response.json()

        if polling_response['status'] == 'completed':
            break

        time.sleep(5)
        
def get_result(polling_endpoint, header):
    polling_response = requests.get(polling_endpoint, headers=header)
    
    return polling_response
    


# Get the paragraphs of the transcript
def get_paragraphs(polling_endpoint, header):
    paragraphs_response = requests.get(polling_endpoint + "/paragraphs", headers=header)
    paragraphs_response = paragraphs_response.json()

    paragraphs = []
    for para in paragraphs_response['paragraphs']:
        paragraphs.append(para)

    return paragraphs

# Verify/Validate email address

def validate_and_verify_email(input_email):
    email = input_email
    isValid = validate(
        email_address=email,
        check_format=True,
        check_blacklist=True,
        check_dns=True,
        dns_timeout=10,
        check_smtp=True,
        smtp_debug=True
    )
    return isValid

def check_if_professional(email_address: str) -> int:
    get_data = pd.read_csv(os.path.normcase(os.path.abspath('routers/email-providers.csv')), header= None)
    free_domain = email_address.split('@')[1]
    return len(get_data.loc[get_data[0] == free_domain])

"""
file must be audios.
"""
def check_if_audio(files) -> bool:
    for file in files:
        if file.content_type.split("/")[0] != "audio":
            return False
    return True
    
# get the total length of the files in secs.
def get_length(files) -> int:
    total_length = 0
    for file in files:
        contents = file.file.read(5242880)
        with open(file.filename, 'wb') as f:
            f.write(contents)
        total_length += audio_details(file.filename)['overall']
    
    return total_length


# return a hashed string.
def generate_signature(secret: bytes, payload: bytes, digest_method = hashlib.sha512):
    return hmac.new(secret.encode('utf-8'), payload, digest_method).hexdigest()