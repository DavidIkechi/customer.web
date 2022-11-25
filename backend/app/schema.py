from datetime import datetime
from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Extra
from uuid import UUID, uuid1

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    # created_at: datetime


class UserCreate(UserBase):
    company_name: str
    password: str

class User(UserBase):
    id: int
    company_id: int
    is_active: bool
    is_admin: bool
    is_verified: bool

    class Config:
        orm_mode = True

class user_update(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr

class JobBase(BaseModel):
    job_status: str

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int
    audio_id: int
    class Config:
        orm_mode = True

class AudioBase(BaseModel):
    audio_path: str
    transcript: str
    size: int
    duration: int
    timestamp: datetime
    positivity_score: float
    negativity_score : float
    neutrality_score : float
    overall_sentiment: str
    most_positive_sentences: list
    most_negative_sentences: list

class AudioCreate(AudioBase):
    pass

class Audio(AudioBase):
    id: int
    agent_id: int
    job : Job

    class Config:
        orm_mode = True

class AgentBase(BaseModel):
    first_name: str
    last_name: str

class AgentCreate(AgentBase):
    pass

class Agent(AgentBase):
    id: int
    company_id: int
    audios : list[Audio] = []

    class Config:
        orm_mode = True

class CompanyBase(BaseModel):
    name: str
    address: str
    size: int

class CompanyCreate(CompanyBase):
    pass

class Company(CompanyBase):
    id: int
    users : list[User] = []
    audios : list[Agent] = []

    class Config:
        orm_mode = True


class HistoryBase(BaseModel):

    user_id: int
    sentiment_result: str
    agent_name: str
    audio_name: str


class HistoryCreate(HistoryBase):
    pass
   


class History(HistoryBase):
    id: int

    class Config:
        orm_mode = True



class Analysis(AudioBase):
    pass

class Recordings(BaseModel):
    audio_path: str
    size: int
    duration: int
    timestamp: datetime

    class Config:
        orm_mode = True

class UserProfile(BaseModel):
    id: str
    phone_number: str
    company_address: str
    email: str
    company_id: int
    api_key: UUID = uuid1()
