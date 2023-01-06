from fastapi import FastAPI, status, Depends, APIRouter,  UploadFile, File, Form, Query, Request, HTTPException, BackgroundTasks
from typing import List, Union, Optional
from pathlib import Path
from audio import audio_details
import services as _services
import models, schema
from fastapi_pagination import Page, paginate, Params
from sqlalchemy.orm import Session
from auth import (
    get_active_user,
    get_admin,
    get_current_user
)
from emails import *
from . import utility as utils
import auth
from . import utility as utils
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import os
import shutil
import cloudinary
import cloudinary.uploader
from BitlyAPI import shorten_urls
import crud
from routers.transcribe import transcribe_file
from jwt import main_login, get_access_token, verify_password, refresh
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from emails import send_email, verify_token, send_password_reset_email, password_verif_token, send_freeTrial_email

analyze_router = APIRouter(
    prefix='/analyse',
    tags=['analyze'],
)


async def analyse_audios(first_name: str, last_name: str, files: list, distinct_id:int, user_id: int, company_id: int, db: Session):
    
    db_company = db.query(models.Company).filter(models.Company.id == company_id).first()
    
    all_transcripts = []
    try:
        for file in files: 
            duration = audio_details(file.filename)
            result = cloudinary.uploader.upload_large(file.filename, resource_type = "auto", 
                                                        chunk_size = 6000000)
            url = result.get("secure_url")
            urls = [url]
            response = shorten_urls(urls)
            retrieve_url = response[0]
            new_url = retrieve_url.short_url
            
            size = Path(file.filename).stat().st_size / 1048576
            audio_time = str(duration['hours'])+":"+ str(duration['mins'])+":"+ str(duration['secs'])
            transcript = transcribe_file(new_url)
            
            if transcript is False:
                return JSONResponse(
                    status_code= 406,
                    content=jsonable_encoder({"detail": "An error occurred while uploading, please try again"}),
                )
            # get some essential parameters
            audio_url = transcript['audio_url']
            job_status = transcript['status']
            transcript_id = transcript['id']
            
            db_company.time_left = db_company.time_left - duration['overall']
            db.commit()
            
            # if the agent name is already in the database before creating for the agent.
            if not db.query(models.Agent).filter(models.Agent.first_name == first_name, 
                                            models.Agent.last_name == last_name).first():
                db_agent = models.Agent(first_name=first_name, last_name=last_name, location = " ", company_id=company_id)
                # Add Agent
                db.add(db_agent)
                db.commit()
                db.refresh(db_agent)
            else:
                db_agent = db.query(models.Agent).filter(models.Agent.first_name == first_name, 
                                            models.Agent.last_name == last_name).first()
            

            db_audio = models.Audio(audio_path=audio_url, job_id = transcript_id, user_id=user_id, size=size, duration=audio_time, 
                                    agent_id=db_agent.id, agent_firstname= db_agent.first_name, agent_lastname=db_agent.last_name, 
                                    filename = file.filename)

            db.add(db_audio)
            db.commit()
            db.refresh(db_audio)
            # get the audio id and some details from the audio table.
            aud_details = db.query(models.Audio).filter(models.Audio.job_id == transcript_id).first()
            audio_id = aud_details.id
            # update the Agent table.
            db_agent = db.query(models.Agent).filter(models.Agent.first_name == first_name, 
                                            models.Agent.last_name == last_name).first()
            db_agent.aud_id = audio_id
            db.commit()
            # create the Job Table as well.
            db_job = models.Job(job_status=job_status, audio_id = audio_id, job_id = distinct_id)
            db.add(db_job)
            db.commit()
            db.refresh(db_job)
            
            all_transcripts.append({
                "id":distinct_id,
                "audio_id": audio_id,
                "transcript_id": transcript_id, 
            })
            
            # delete the file
            os.remove(file.filename)
            db_company = db.query(models.Company).filter(models.Company.id == company_id).first()
                    
    except Exception as e:
        # send an email to let them know their email failed.
        db_user = crud.get_user(db, user_id)
        user_email = db_user.email
        
        user = crud.get_user_by_email(db, email=user_email)
        await transcription_fail_email([user_email], user)
        with open("error.log", "a") as f:
            f.write(str(user_email) + " " + str(datetime.now()) + " " + str(e) + "\n\n")
        # create a log file to log all errors
        
@analyze_router.post("/upload_audios", status_code = 200)
async def analyse(first_name: str = Form(), last_name: str = Form(), background_task: BackgroundTasks = BackgroundTasks(), 
                  db: Session = Depends(_services.get_session), files: List[UploadFile]=File(...), 
                  user: models.User = Depends(get_active_user)):
    try:
        # initialize the total file length to 0
        total_length = 0
        # check if the length of the file is more than 5
        if len(files) > 5:
            return JSONResponse(
                status_code= 406,
                content=jsonable_encoder({"detail": "You can not upload more than two files"}),
            )
        # if the file type is not audio.
        if not utils.check_if_audio(files):
            return JSONResponse(
                status_code= 406,
                content=jsonable_encoder({"detail": "Please ensure you have uploaded an audio file."}),
            )    
        # get the length of the audio file altogether.
        total_length = utils.get_length(files)
        user_id = user.id
        company_id = user.company_id        
        # convert to lower case for both first and last name.    
        first_name = first_name.lower()
        last_name = last_name.lower()
        agent_name = "%s %s" %(first_name, last_name) 
        
        db_company = db.query(models.Company).filter(models.Company.id == company_id).first()
        
        # get all distinct ids.
        distinct_id = len(crud.get_distinct_ids(db)) + 1
       
        # if the time left is less.
        if db_company.time_left < total_length:
            return JSONResponse(
                status_code= 406,
                content=jsonable_encoder({"detail": "You don't have enough Credit left"}),
            )
        # add the audios as background tasks
        background_task.add_task(analyse_audios, first_name, last_name, files, distinct_id, user_id, company_id, db)

    except Exception as e:
        return JSONResponse(
            status_code= 500,
            content=jsonable_encoder({"detail": str(e)}),
        ) 
    
    return {
        "detail":f"Your Job has been submitted with id {distinct_id}"
    }

# @analyze_router.post("/upload_audios_multiple", status_code = 200)
# async def analyser(first_name: List[str] = Form(), last_name: List[str] = Form(), 
#                   db: Session = Depends(_services.get_session), file: List[UploadFile]=File(...), user: models.User = Depends(get_active_user)):
#     first_name = first_name[0].split(",")
#     last_name = last_name[0].split(",")
#     all_transcript_id = []
#     all_audio_id = []
#     print(first_name)
#     try:
#         user_id = user.id
#         company_id = user.company_id
#         # print(company_id)
        
#         # convert to lower case for both first and last name. 
#         print(file)
#         for i,j,k in zip(first_name, last_name, file): 
#             first_name = i.lower()
#             last_name = j.lower()
#             # agent_name = "%s %s" %(first_name, last_name) 

#             contents = k.file.read()
#             with open(k.filename, 'wb') as f:
#                 f.write(contents)
#             duration = audio_details(k.filename)
#             # db_company = db.query(models.Company).filter(models.Company.id == company_id).first()
#             # if the time left is less.
#             # if db_company.time_left < duration['overall']:
#             #     return JSONResponse(
#             #     status_code= 406,
#             #     content=jsonable_encoder({"detail": "You don't have enough Credit left"}),
#             #     )
#             # # if the time left is more.
#             result = cloudinary.uploader.upload_large(k.filename, resource_type = "auto", 
#                                                 chunk_size = 6000000)
#             url = result.get("secure_url")
#             urls = [url]
#             response = shorten_urls(urls)
#             retrieve_url = response[0]
#             new_url = retrieve_url.short_url
            
#             size = Path(k.filename).stat().st_size / 1048576
#             audio_time = str(duration['hours'])+":"+ str(duration['mins'])+":"+ str(duration['secs'])
#             transcript = transcribe_file(new_url)
#             # get some essential parameters
#             audio_url = transcript['audio_url']
#             job_status = transcript['status']
#             transcript_id = transcript['id']
            
#             # db_company.time_left = db_company.time_left - duration['overall']
#             db.commit()
            
#             # if the agent name is already in the database before creating for the agent.
#             if not db.query(models.Agent).filter(models.Agent.first_name == first_name, 
#                                             models.Agent.last_name == last_name).first():
#                 db_agent = models.Agent(first_name=first_name, last_name=last_name, location = " ", company_id=company_id)
#                 # Add Agent
#                 db.add(db_agent)
#                 db.commit()
#                 db.refresh(db_agent)
#             else:
#                 db_agent = db.query(models.Agent).filter(models.Agent.first_name == first_name, 
#                                             models.Agent.last_name == last_name).first()
            

#             db_audio = models.Audio(audio_path=audio_url, job_id = transcript_id, user_id=user_id, size=size, duration=audio_time, 
#                                     agent_id=db_agent.id, agent_firstname= db_agent.first_name, agent_lastname=db_agent.last_name, 
#                                     filename = k.filename)

#             db.add(db_audio)
#             db.commit()
#             db.refresh(db_audio)
#             # get the audio id and some details from the audio table.
#             aud_details = db.query(models.Audio).filter(models.Audio.job_id == transcript_id).first()
#             audio_id = aud_details.id
#             # update the Agent table.
#             db_agent = db.query(models.Agent).filter(models.Agent.first_name == first_name, 
#                                             models.Agent.last_name == last_name).first()
#             db_agent.aud_id = audio_id
#             db.commit()
#             # create the Job Table as well.
#             db_job = models.Job(job_status=job_status, audio_id = audio_id)
#             db.add(db_job)
#             db.commit()
#             db.refresh(db_job)

#             all_transcript_id.append(transcript_id)
#             all_audio_id.append(audio_id)
            
#             # delete the file
#             os.remove(k.filename)

#     except Exception as e:
#         return JSONResponse(
#             status_code= status.HTTP_400_BAD_REQUEST,
#             content=jsonable_encoder({"detail": str(e)}),
#         ) 
    
#     # return {
#     #     "detail":{
#     #         "id":audio_id,
#     #         "transcript_id": transcript_id,
#     #     }   
#     # }
#     result_list = []
#     print(all_audio_id, all_transcript_id)
#     for x,y in zip(all_audio_id, all_transcript_id):
#         result_list.append({"id": x, "transcript_id": y})

#     return result_list

@analyze_router.post("/tryForFree")
async def free_trial(email: str = Form(), db : Session = Depends(_services.get_session), file: UploadFile = File(...)):
    try:
        email_lower = email.lower()
        email_check = crud.free_user_by_email(db, email=email_lower)
        with open(f'{file.filename}', "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        fileSize = 5242880 / 1048576
        getSize = Path(file.filename).stat().st_size / 1048576
        time = str(0)+":"+str(3)+":"+str(0)
        duration = audio_details(file.filename)
        audio_time = str(duration['hours'])+":"+ str(duration['mins'])+":"+ str(duration['secs'])

        
        if email_check:
            os.unlink(file.filename)
            return JSONResponse(
            status_code= 400,
            content=jsonable_encoder({"detail": "Email Has Been Used For Free Trial Before, Please Sign Up For Our Paid Plan."})
            )
        if getSize > fileSize:
            os.unlink(file.filename)
            return JSONResponse(
            status_code= 406,
            content=jsonable_encoder({"detail": "File Must Not Be More Than 5MB"})
            )
        if audio_time > time:
            os.unlink(file.filename)
            return JSONResponse(
            status_code= 406,
            content=jsonable_encoder({"detail": "This Audio File More Than 2 Minutes, Please Select A File With Fewer Minutes."})
            )
        else:
            result = cloudinary.uploader.upload_large(file.filename, resource_type = "auto", chunk_size = 6000000)
            url = result.get("secure_url")
            urls = [url]
            response = shorten_urls(urls)
            retrieve_url = response[0]
            new_url = retrieve_url.short_url

            transcript = transcribe_file(new_url)


            # get some essential parameters
            transcript_id = transcript['id']
            filename = file.filename
            transcript_status = transcript['status']
            sizeMb = (str(getSize) + 'MB')
            audio_list = ",".join([transcript_status, filename, sizeMb])


            db_result = models.FreeTrial(transcript_id=transcript_id, transcript_status=audio_list, email=email)
            
           
            db.add(db_result)
            db.commit()
            db.refresh(db_result)
            # delete the file
            os.remove(file.filename)
            status_break = audio_list.split(",")
    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {
        "detail":{
            "transcript_id": transcript_id, 
            "status": status_break[0], 
            "filaname": status_break[1], 
            "file_size": status_break[2]
        }
    }


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

@analyze_router.get("/test")
async def test(db : Session = Depends(_services.get_session)):
    try:
        # db = initialize_db()
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
                
                await send_freeTrial_email([get_email], transcript)

    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        )
    return {
        "detail":{
            "transcript_id": details
        }
    }
