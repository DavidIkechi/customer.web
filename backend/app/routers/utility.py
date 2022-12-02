import requests
import time
from fastapi import HTTPException
import boto3
from botocore.exceptions import ClientError
import logging
import requests
import time

import os

from dotenv import load_dotenv

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


# Uploads a file to AAI servers
def upload_file(audio_file, header):
    try:
        # upload_response = requests.post(
        #     upload_endpoint,
        #     headers=header, data=_read_file(audio_file)
        # )
        bucket_name = "code-bearer"
        object_name = audio_file

        iam_access_id = os.getenv("Access_key_id")
        iam_secret_key = os.getenv("secret_access_key")
        s3_client = boto3.client(
            's3', 
            aws_access_key_id=iam_access_id,
            aws_secret_access_key=iam_secret_key
            )
        p_url = s3_client.generate_presigned_url(
            ClientMethod='get_object',
            Params={'Bucket': bucket_name, 'Key': object_name},
            ExpiresIn = 1800)
        for bucket in s3.buckets.all():
            print(bucket.name)

    except ClientError as e:
        logging.error(e)
    
    return p_url


# Request transcript for file uploaded to AAI servers
def request_transcript(upload_url, header):
    transcript_request = {
        'audio_url': upload_url
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