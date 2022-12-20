from fastapi import FastAPI, status, Depends, APIRouter,  UploadFile, File, Form, Query, Request
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
import auth
from . import utility as utils
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import os
import cloudinary
import cloudinary.uploader
from BitlyAPI import shorten_urls
import crud
from routers.transcribe import transcribe_file
from jwt import main_login, get_access_token, verify_password, refresh
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from emails import send_email, verify_token, send_password_reset_email, password_verif_token

analyze_router = APIRouter(
    prefix='/analyse',
    tags=['analyze'],
)

@analyze_router.post("/upload_audios", status_code = 200)
async def analyse(first_name: str = Form(), last_name: str = Form(), 
                  db: Session = Depends(_services.get_session), file: UploadFile=File(...), user: models.User = Depends(get_active_user)):
    try:
        user_id = user.id
        company_id = user.company_id
        
        # convert to lower case for both first and last name.    
        first_name = first_name.lower()
        last_name = last_name.lower()
        agent_name = "%s %s" %(first_name, last_name) 

        contents = file.file.read()
        with open(file.filename, 'wb') as f:
            f.write(contents)
        duration = audio_details(file.filename)
        db_company = db.query(models.Company).filter(models.Company.id == company_id).first()
        
        # if the time left is less.
        if db_company.time_left < duration['overall']:
            raise HTTPException(status_code = 406, detail="You don't have enough Credit left")

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
        db_job = models.Job(job_status=job_status, audio_id = audio_id)
        db.add(db_job)
        db.commit()
        db.refresh(db_job)
        
        # delete the file
        os.remove(file.filename)

    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content=jsonable_encoder({"detail": str(e)}),
        ) 
    
    return {
        "detail":{
            "id":audio_id,
            "transcript_id": transcript_id,
        }   
    }


@analyze_router.post("/tryForFree")
async def free_trial(db : Session = Depends(_services.get_session), file: UploadFile = File(...)):
    try:
    ####### saving the audio file
        with open(f'{file.filename}', "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        fileSize = 5242880
        getSize = os.path.getsize(file.filename)
        ###### transcribing the file
        if not file:
            raise HTTPException(status_code = 406, detail="No File Selected")
        elif getSize > fileSize :
            os.unlink(file.filename)
            raise HTTPException(status_code = 406, detail="File Must Not Be More Than 5MB")
        else:
            result = cloudinary.uploader.upload_large(file.filename, resource_type = "auto", 
                                            chunk_size = 6000000)
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
        size = audio_details(file.filename)["size"]
        sizeMb = (str(size) + 'MB')
        audio_list = ",".join([transcript_status, filename, sizeMb])


        callback = models.FreeTrial(transcript_id = transcript_id, transcript_status=audio_list)

        db.add(callback)
        db.commit()
        db.refresh(callback)
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