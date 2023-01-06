# crud operations for the backend app
from sqlalchemy.orm import Session
from fastapi import HTTPException, status, UploadFile, File, Depends, Response
import models, schema
from random import randint
from routers.sentiment_utility import sentiment, sentiment_assembly
from routers import transcribe
from passlib.context import CryptContext
from fastapi import HTTPException 
import cloudinary
import cloudinary.uploader
from datetime import datetime
import uuid
from sqlalchemy.sql import func
from collections import defaultdict
from routers.utility import *

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def generate_uuid():
    return str(uuid.uuid4())


def is_admin_check(email_address: str):
    admin_list = ['davidakwuruu@gmail.com','tekkieware@gmail.com', 
                  'collinsakpaka@gmail.com','dprincecoder@gmail.com']
    
    return email_address.lower() in admin_list


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_company(db: Session, company_name: str, company_address: str, id: int, time_left: float):
    db_company = models.Company(id= id, name=company_name, address = company_address, plan = "Free", 
                                time_left = time_left)
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

def create_user(db: Session, user: schema.User):
    # get a random id
    company_id = randint(0, 1000000)
    while (get_company(db, company_id) is not None):
        company_id = randint(0, 1000000)

    # create the company.
    if is_admin_check(user.email) is True:
        is_admin = True
        time_left = 6000.0
    else:
        # check if the email address is a professional email address.
        if check_if_professional(user.email) > 0:
            raise HTTPException(status_code=400, detail="Please use a Business email address")
        is_admin = False
        time_left = 0.0
    create_company(db, user.company_name, user.company_address, company_id, time_left)
    # create the user.
    db_user = models.User(first_name=user.first_name, last_name=user.last_name, is_admin= is_admin, 
                          email=user.email, password=pwd_context.hash(user.password), company_id = company_id)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    create_user_profile(db, company_id, user.email)
    return db_user

def update_user(db: Session, user: schema.user_update, user_id: int):
    # Getting the current user
    db_user = get_user(
        db = db,
        user_id=user_id
        )
    if not db_user:
        raise HTTPException(status_code=404, detail="user not found")
    user_data = user.dict(exclude_unset=True)
    for key, value in user_data.items():
            setattr(db_user, key, value)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_profile(db:Session, profile:schema.UserProfileUpdate, user_id:int):
    user_profile = db.query(models.UserProfile).filter(models.UserProfile.id == user_id).first()
    if user_profile is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"The Profile for user with id {user_id} does not exist")
        
    if user_profile.id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN , 
                                    detail="Not authorized to perform requested action")
    user = db.query(models.User).filter(models.User.id == user_profile.id).first()
    user.firstname = profile.first_name
    user.last_name = profile.last_name
    user_profile.phone_number = profile.phone_number
    user_profile.company_address = profile.company_address
    db.commit()
    db.refresh(user_profile)
    return user_profile


def upload_user_image(db:Session , user_id:int, image_file:UploadFile):
    user_profile = db.query(models.UserProfile).filter(models.UserProfile.id == user_id).first()
    try:
        image_response = cloudinary.uploader.upload(image_file.file)
        image_url = image_response.get("secure_url") 
        user_profile.company_logo_url = image_url        
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="There was an error uploading the file")
    db.commit()
    db.refresh(user_profile)
    return {"image_url": image_url}

    
def delete_user(db: Session, user_id: int):
    # the company is the base model. Like the very top model. 
    # so deleting from there would affect every table.
    get_company = get_user(db, user_id)
    if get_company is None:
            raise HTTPException(status_code=404, 
                                detail="User not found")
    deleted_user = db.query(models.Company).filter(models.Company.id == get_company.company_id).delete()
    db.commit()
    return {"message":"Success"}

def get_audio(db: Session, audio_id: int):
    return db.query(models.Audio).filter(models.Audio.id == audio_id).first()

def get_freeaudio(db: Session, audio_id: int):
    return db.query(models.Audio).filter(models.Audio.job_id == audio_id).first()

def get_freetrial(db: Session, id: int):
    return db.query(models.FreeTrial).filter(models.FreeTrial.transcript_id == id).first()
    
# def get_all_freeTrial(db: Session, id: int):
#     return db.query(models.FreeTrial).filter(models.FreeTrial.transcript_id == id).all()

def get_all_freeTrial(db: Session):
    return db.query(models.FreeTrial).all()

def get_audios(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Audio).offset(skip).limit(limit).all()

def get_audios_by_user(db: Session, user_id: int):
    return db.query(models.Audio).filter(models.Audio.user_id == user_id).all()

def get_company(db: Session, company_id: int):
    return db.query(models.Company).filter(models.Company.id == company_id).first()

def create_audio(db: Session, audio: schema.Audio, agent_id: int):
    db_audio = models.Audio(audio_path=audio.audio_path, size=audio.size, duration=audio.duration, transcript=audio.transcript, timestamp=audio.timestamp, positivity_score=audio.positivity_score,
    negativity_score=audio.negativity_score, neutrality_score=audio.neutrality_score, overall_sentiment=audio.overall_sentiment, most_positive_sentences =audio.most_positive_sentences, most_negative_sentences = audio.most_negative_sentences, agent_id=agent_id, agent_firstname = db_audio.agent_firstname, agent_lastname = db_audio.agent_lastname)


    db.add(db_audio)
    db.commit()
    db.refresh(db_audio)
    return db_audio

def get_jobs_uploaded(db:Session, current_user, skip: int , limit: int ):
    job_list = []
    all_audios = db.query(models.Audio).filter(models.Audio.user_id == current_user.id).offset(skip).limit(limit).all()
    for audio in all_audios:
        new_data = {"transcript_id" :audio.job_id,
                    "job_status":audio.job.job_status,
                    "agent_name":f"{audio.agent_firstname} {audio.agent_lastname}",
                    "audio_url" :audio.audio_path
                    }
        
        job_list.append(new_data)
    return job_list

def get_job(db: Session, job_id: int):
    return db.query(models.Job).filter(models.Job.id == job_id).first()

def get_jobs_by_job_id(db: Session, job_id: int):
    return db.query(models.Job).filter(models.Job.job_id == job_id).all()

def get_jobs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Job).offset(skip).limit(limit).all()

def create_job(db: Session, job: schema.Job, audio_id: int):
    db_job = models.Job(timestamp=job.timestamp, job_status=job.job_status, audio_id=audio_id)
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

def get_audio_by_agent_id(db: Session, agent_id: int):
    return db.query(models.Audio).filter(models.Audio.agent_id == agent_id).all()

def get_agent(db: Session, agent_id: int):
    return db.query(models.Agent).filter(models.Agent.id == agent_id).first()

def get_agents_by_company_id(db: Session, company_id: int):
    return db.query(models.Agent).filter(models.Agent.company_id == company_id).all()

def create_agent(db: Session, agent: schema.AgentCreate, company_id: int):
    db_agent = models.Agent(first_name=agent.first_name, last_name=agent.last_name, location=agent.location, company_id=company_id)
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent


def create_history(db: Session, history: schema.HistoryCreate):
    db_history = models.History(**history)
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return db_history


def get_history_by_user_id(db: Session, user_id: int):
    return db.query(models.History).filter(models.History.user_id == user_id).all()



def create_analysis(db, result= schema.Audio, user_id=int):
    db_analysis = models.Audio(transcript = result.transcript, positivity_score= result.positivity_score, negativity_score= result.negativity_score, overall_sentiment= result.overall_sentiment)
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    return db_analysis

def get_analysis(db: Session, analysis_id = int):
    return db.query(models.Analysis).filter(models.Analysis == analysis_id).first()

def create_user_profile(db: Session, company_id: int, user_email: str):
    user = get_user_by_email(db, user_email)
    user_id = user.id
    db_profile = models.UserProfile(id=user_id, company_id = company_id, email=user_email)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

def get_user_profile(db: Session, user_id: int):
    agents = []
    user_profile = db.query(models.UserProfile).filter(models.UserProfile.id == user_id).first()
    company = db.query(models.Company).filter(models.Company.id ==user_profile.company_id).first()
    user = db.query(models.User).filter(models.User.id == user_id).first()
    for agent in db.query(models.Agent).filter(models.Agent.company_id == user_profile.company_id).all():
        agents.append({"first_name": agent.first_name, "last_name": agent.last_name, "location": agent.location})

    return {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "company_name": company.name,
        "agents": agents,
        "phone_number": user_profile.phone_number,
        "email": user.email,
        "company_address": user_profile.company_address,
        "company_logo_url": user_profile.company_logo_url,
        "api_key": user_profile.api_key
    }

def get_user_profile_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def reset_password(db: Session, password: str, user: models.User):

    user.password = pwd_context.hash(password)

    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_order_summary_by_email(db: Session, user_email: str):
    user_email = user_email
    order_summary = db.query(models.Order).filter(models.Order.user_email==user_email).all()
    return order_summary

def get_order_summary_by_id(db: Session, order_id: str):
    order_id = order_id
    order_summary = db.query(models.Order).filter(models.Order.id==order_id).first()
    return order_summary

def get_leaderboard(db: Session, user_id: int):
    results = db.query(models.Audio).filter(models.Audio.user_id == user_id).all()
    leaderboard = []
    
    agents = dict()
    unique_ids = []
    week = datetime.now().isocalendar().week
    month = datetime.now().month
    total_week = 0
    total_month = 0

    for i in results:
        if i.job.job_status == "completed":
            unique_id = i.agent_id
            unique_ids.append(unique_id)

        if i.timestamp.isocalendar().week == week:
            total_week += 1
        
        if i.timestamp.month == month:
            total_month += 1


    for i in unique_ids:
        average_scores = []
        per_agent = {"week": {"firstname": "", "lastname": "", "agent_id": "", "total_calls": 0, "positive_score": 0, "negative_score": 0, "neutral_score":0,
        "average_score": 0, "str_agent_id": ""},
        "month": {"firstname": "", "lastname": "", "agent_id": "", "total_calls": 0, "positive_score": 0, "negative_score": 0, "neutral_score":0,
        "average_score": 0, "str_agent_id": ""}
        }
        for j in results:
            if j.job.job_status == "completed":
                if j.agent_id == i:
                    if j.timestamp.isocalendar().week == week:
                        per_agent["week"]["firstname"] = j.agent_firstname.capitalize()
                        per_agent["week"]["lastname"] = j.agent_lastname.capitalize()
                        per_agent["week"]["agent_id"] = j.agent_id
                        per_agent["week"]["total_calls"] += 1
                        if j.overall_sentiment == "Positive":
                            per_agent["week"]["positive_score"] += 1
                        if j.overall_sentiment == "Negative":
                            per_agent["week"]["negative_score"] += 1
                        if j.overall_sentiment == "Neutral":
                            per_agent["week"]["neutral_score"] += 1
                        average_scores.append(j.average_score)
                        per_agent["week"]["average_score"] = round(sum(average_scores)/len(average_scores), 2)
                        per_agent["week"]["str_agent_id"] = "AG" + str(1000000 + per_agent["week"]['agent_id']) + "DE"
                        per_agent["week"]["weekly"] = "week"

                    if j.timestamp.isocalendar().week != week:
                        per_agent["week"] = {}

                    if j.timestamp.month != month:
                        per_agent["month"] = {}

                    if j.timestamp.month == month:
                        per_agent["month"]["firstname"] = j.agent_firstname.capitalize()
                        per_agent["month"]["lastname"] = j.agent_lastname.capitalize()
                        per_agent["month"]["agent_id"] = j.agent_id
                        per_agent["month"]["total_calls"] += 1
                        if j.overall_sentiment == "Positive":
                            per_agent["month"]["positive_score"] += 1
                        if j.overall_sentiment == "Negative":
                            per_agent["month"]["negative_score"] += 1
                        if j.overall_sentiment == "Neutral":
                            per_agent["month"]["neutral_score"] += 1
                        average_scores.append(j.average_score)
                        per_agent["month"]["average_score"] = round(sum(average_scores)/len(average_scores), 2) 
                        per_agent["month"]["str_agent_id"] = "AG" + str(1000000 + per_agent["month"]['agent_id']) + "DE"
                        per_agent["month"]["monthly"] = "month"
        agents[i] = per_agent
        
    leaderboard_week = []
    leaderboard_month = []
    if total_week > 0:
        for i in agents.values():
            if i["week"] != {}:
                leaderboard_week.append(i["week"])
            
        leaderboard_week = sorted(leaderboard_week, key=lambda k: k['average_score'], reverse=True)

    if total_month > 0:
        for i in agents.values():
            if i["month"] != {}:
                leaderboard_month.append(i["month"])
        leaderboard_month = sorted(leaderboard_month, key=lambda k: k['average_score'], reverse=True)

    for i in leaderboard_week:
        rank = str(leaderboard_week.index(i) + 1)
        if rank[-1] == "1":
            i['rank'] = str(rank) + "st"
        elif rank[-1] == "2":
            i['rank'] = str(rank) + "nd"
        elif rank[-1] == "3":
            i['rank'] = str(rank) + "rd"
        else:
            i['rank'] = str(rank) + "th"

    for i in leaderboard_month:
        rank = str(leaderboard_month.index(i) + 1)
        if rank[-1] == "1":
            i['rank'] = str(rank) + "st"
        elif rank[-1] == "2":
            i['rank'] = str(rank) + "nd"
        elif rank[-1] == "3":
            i['rank'] = str(rank) + "rd"
        else:
            i['rank'] = str(rank) + "th"
    
    leaderboard.append(leaderboard_week)
    leaderboard.append(leaderboard_month)

    return leaderboard
        
def refresh_api_key(db:Session, user_id: int):
    key = generate_uuid()
    user_profile = db.query(models.UserProfile).filter(models.UserProfile.id == user_id).first()
    user_profile.api_key = key
    db.commit()
    db.refresh(user_profile)
    return key
    
def get_queued_jobs(db: Session):
    return db.query(models.Job).filter(models.Job.job_status != "completed").order_by(models.Job.audio_id.desc()).all()

def analyse_and_store_audio(db:Session, job_id, user_id):
    Job = db.query(models.Audio).filter(models.Audio.job_id == job_id).first()
    if not Job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Job with id: {job_id} was not found")
    job_audio_id = job_id
    audio_id = Job.id

    db_job = db.query(models.Job).filter(models.Job.audio_id == audio_id).first()
    if db_job.job_status == "completed":        
        return {
                "transcript": Job.transcript,
                "positivity_score": Job.positivity_score,
                "negativity_score": Job.negativity_score,
                "neutrality_score": Job.neutrality_score,
                "overall_sentiment": Job.overall_sentiment,
                "most_negative_sentences": Job.most_negative_sentences,
                "most_positive_sentences": Job.most_positive_sentences,
                "audio_url": Job.audio_path,
                "audio_size": Job.size,
                "audio_duration": Job.duration,
                "audio_filename": Job.filename 
            }
        
    else:
        transcript_audio = transcribe.get_transcript_result(job_audio_id)

        db_job.job_status = transcript_audio['status']
        db.commit()

        if transcript_audio['status'] != "completed":
            return {
                "detail":{
                    "status":transcript_audio['status']
                }
            }

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

    create_history(db, history_create)
    other_details = {
        "audio_url": db_audio_url,
        "audio_size": db_audio_size,
        "audio_duration": db_audio_duration,
        "audio_filename": db_audio_filename
    }
    dic2 = dict(sentiment_result, **other_details)
    return {"sentiment_result": dic2}

#News letter.
def add_newsletter_subscriber(db: Session, subscriber: schema.Newsletter):
    db_subscriber = models.Newsletter(email = subscriber.email)
    db.add(db_subscriber)
    db.commit()
    db.refresh(db_subscriber)
    return db_subscriber

def check_subscrition_email(db: Session, email: str):
    return db.query(models.Newsletter).filter(models.Newsletter.email == email).first()


def get_newsletter_subscribers(db: Session, skip: int = 0):
    return db.query(models.Newsletter).offset(skip).all()

def free_user_by_email(db: Session, email: str):
    return db.query(models.FreeTrial).filter(models.FreeTrial.email == email).first()
    
def get_distinct_ids(db: Session):
    return db.execute("SELECT DISTINCT job_id FROM jobs").all()

def add_plan(db: Session, plan: schema.Plan):
    db_plan = models.ProductPlan(name = plan.name.lower(), price = plan.price, features = plan.features)
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    return db_plan

def get_plan_by_name(db: Session, plan_name: str):
    return db.query(models.ProductPlan).filter(models.ProductPlan.name == plan_name).first()


def store_transaction(db: Session, trans: dict):
    db_trans = models.PaymentHistory(
        transaction_id = trans['trans_id'],
        reference = trans['reference'],
        amount = trans['amount'],
        plan = trans['plan'],
        time_paid = trans['time_paid'],
        minutes = trans['minutes'],
        payment_type = trans['payment_channel'],
        email = trans['email_address']
    )
    
    db.add(db_trans)
    db.commit()
    db.refresh(db_trans)
    
    return db_trans

def check_transaction(db: Session, ref_code: str):
    return db.query(models.PaymentHistory).filter(models.PaymentHistory.reference == ref_code).first()

def top_up(db: Session, email_address: str, top_details: dict):
    # get the user 
    get_user = get_user_by_email(db, email_address)
    if get_user is None:
            raise HTTPException(status_code=404, 
                                detail="User not found")
    get_company = db.query(models.Company).filter(models.Company.id == get_user.company_id).first()
    # get_plan = get_company.plan
    # get_time = get_company.time_left
    get_plan = get_user.company.plan
    get_time = get_user.company.time_left
    
    if get_plan.lower() != "free":
    # get price for plans.
        initial_plan = get_plan_by_name(db, get_plan)
        initial_price = initial_plan.price
        # top up details
        top_plan = get_plan_by_name(db, top_details['plan'])
        top_price = top_plan.price
        # add the time left for the user.
        new_time = (initial_price / top_price) * get_time
    else:
        new_time = get_time
    
    add_mins = float(top_details['minutes']) * 60
    get_company = db.query(models.Company).filter(models.Company.id == get_user.company_id).first()

    get_company.time_left = round(new_time + add_mins, 2)
    get_company.plan = top_details['plan']
    db.commit()
    
    return get_company

def get_all_plans(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ProductPlan).offset(skip).limit(limit).all()