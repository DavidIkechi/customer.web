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
    
class PaymentBase(BaseModel):
    minutes: int
    plan: str


class UserCreate(UserBase):
    company_name: str
    company_address: str
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
    filename: str
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

    class Config:
        orm_mode = True

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
    location: str

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
    filename: str
    size: int
    duration: int
    job_id: str
    timestamp: datetime

    class Config:
        orm_mode = True

class TotalAnalysis(BaseModel):
    week: list = []
    month: list = []

    class Config:
        orm_mode = True


class UserProfile(BaseModel):
    id: str
    phone_number: Optional[str]
    company_address: Optional[str]
    company_logo_url: Optional[str]
    email: str
    company_id: int
    api_key: UUID = uuid1()

    
class UserProfileUpdate(BaseModel):
    phone_number: Optional[str]
    company_address: Optional[str]



class ForgetPassword(BaseModel):
    email: str


class UpdatePassword(BaseModel):
    password: str


class OrderBase(BaseModel):
    billing_plan: str 

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: int 
    user_email: str
    billing_plan: str 
    monthly_amount: float 
    annual_amount: float
    order_date: datetime
    next_payment_due_date: datetime

class ChangePlan(BaseModel):
    plan: str

class ChangePassword(BaseModel):
    old_password: str
    new_password: str

class RefreshToken(BaseModel):
    refresh_token:str

class Newsletter(BaseModel):
    email: EmailStr

    class Config:
        orm_mode = True
        
class Plan(BaseModel):
    name: str
    price: float
    features: list