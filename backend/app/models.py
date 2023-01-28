# models for database [SQLAlchemy]
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Enum, Float, JSON, TEXT, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime, date

from sqlalchemy_utils import URLType

from db import Base

from sqlalchemy.dialects.postgresql import UUID
import uuid
from random import randint
def generate_uuid():
    return str(uuid.uuid4())

def generate_agent_id():
    agent_id = randint(0, 1000000)
    return agent_id


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), index=True)
    last_name = Column(String(255), index=True)
    email = Column(String(255))
    password = Column(String(255))
    is_active = Column(Boolean, default=False)
    is_admin = Column(Boolean, default=False)
    is_verified = Column(Boolean, default=False)
    company_id = Column(Integer, ForeignKey("companies.id", ondelete='CASCADE'))
    created_at = Column(DateTime(timezone=True), default=datetime.now())
    is_deactivated = Column(Boolean, default=False)
    deactivated_at = Column(DateTime(timezone=True), default=datetime.now())
    is_due_for_deletion = Column(Boolean, default=False)
    
    company = relationship("Company", back_populates="user")
    user = relationship("Audio", uselist=False, back_populates="user_audio")




class Company(Base):
    __tablename__ = 'companies'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    address = Column(TEXT)
    size = Column(Integer)
    plan = Column(String(255), index=True)
    time_left = Column(Float, index=True, nullable = True)
    
    user = relationship("User", uselist=False, back_populates="company")
    
    


class Agent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True, unique=True, nullable=False, default=generate_agent_id)
    first_name = Column(String(255), index=True)
    last_name = Column(String(255), index=True)
    location = Column(String(255), index=True)
    company_id = Column(Integer, ForeignKey("companies.id", ondelete='CASCADE'))
    aud_id = Column(Integer, index=True)
    
    


class Audio(Base):
    __tablename__ = "audios"
    id = Column(Integer, primary_key=True, index=True)
    audio_path = Column(TEXT)
    filename = Column(TEXT,  nullable = True)
    job_id = Column(String(255), index=True)
    timestamp = Column(DateTime, index=True, default=datetime.now())
    size = Column(Integer, index=True)
    duration = Column(String(255), index=True)
    transcript = Column(TEXT, nullable = True)
    positivity_score = Column(Float, index=True, nullable = True)
    negativity_score = Column(Float, index=True, nullable = True)
    neutrality_score = Column(Float, index=True, nullable = True)
    average_score = Column(Float, index=True, nullable = True)
    overall_sentiment = Column(Enum("Positive", "Negative", "Neutral"), index=True, nullable = True)
    most_positive_sentences = Column(JSON, nullable = True)
    most_negative_sentences = Column(JSON, nullable = True)
    agent_id = Column(Integer, ForeignKey("agents.id", ondelete='CASCADE'))
    agent_firstname = Column(String(255), index=True)
    agent_lastname = Column(String(255), index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete='CASCADE'))

    job = relationship("Job", uselist=False, back_populates="audio")
    user_audio = relationship("User", back_populates="user")

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, index=True, default=datetime.now())
    job_status = Column(TEXT)
    audio_id = Column(Integer, ForeignKey("audios.id"))
    job_id = Column(Integer, index=True)
    mail_sent = Column(Boolean, default=False)
    audio_id = Column(Integer, ForeignKey("audios.id", ondelete='CASCADE'))
    
    audio = relationship("Audio", back_populates="job")

class uploaded_Job(Base):
    __tablename__ = "uploaded_jobs"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String(255), index=True)
    audio_url = Column(String(255), index=True)

class History(Base):
    __tablename__ = "history"
    id = Column(Integer, primary_key=True, index=True)
    sentiment_result = Column(Enum("Positive", "Negative", "Neutral"), index=True)
    audio_name = Column(String(255), index=True)
    agent_name = Column(String(255), index=True)
    date_uploaded = Column(DateTime, default=datetime.utcnow(), index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete='CASCADE'))
    
class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)
    audio_path = Column(TEXT)
    timestamp = Column(DateTime, index=True)
    transcript = Column(TEXT)
    positivity_score = Column(Float, index=True)
    negativity_score = Column(Float, index=True)
    neutrality_score = Column(Float, index=True)
    overall_sentiment = Column(Enum("Positive", "Negative", "Neutral"), index=True)

    agent_id = Column(Integer, ForeignKey("agents.id", ondelete='CASCADE'))

class UserProfile(Base):
    __tablename__ = "accounts"
    
    id = Column(Integer, ForeignKey("users.id"), nullable=True)
    phone_number = Column(String(255))
    company_address = Column(TEXT)
    email = Column(String(255), nullable=True)
    company_id = Column(Integer, ForeignKey("companies.id", ondelete='CASCADE'))
    company_logo_url = Column(URLType, nullable=True)
    api_key = Column(String(255), name="uuid", primary_key=True, default=generate_uuid)


class FreeTrial(Base):
    __tablename__ = "free_trial"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), index=True)
    transcript_id = Column(String(255), index=True)
    transcript_status = Column(TEXT)
    mail_sent = Column(Boolean, default=False)

class Newsletter(Base):
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable = False)
    name = Column(Integer)
    
    
class ProductPlan(Base):
    __tablename__ = "product_plans"
    id = Column(Integer, primary_key=True, index=True)
    icon_url = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    price = Column(Float, index=True, nullable=False)
    features = Column(JSON, nullable=False)
    title = Column(String(255), nullable=False)
    duration = Column(String(255), nullable=False)
    additional = Column(String(255), nullable=False)
    
class PaymentHistory(Base):
    __tablename__ = "payment_history"
    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(TEXT, nullable= True)
    reference = Column(String(255), nullable= True)
    amount = Column(Float, index=True, nullable=False)
    plan = Column(String(255), nullable=False)
    time_paid = Column(DateTime(timezone=True))
    minutes = Column(Integer, index = True)
    payment_type = Column(String(255), nullable= True)
    email = Column(String(255), nullable= True)
    payment_gateway = Column(String(255), nullable=False)
    
    
   
    
    
