# models for database [SQLAlchemy]
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Enum, Float, JSON, TEXT
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime

from sqlalchemy_utils import URLType

from db import Base

from sqlalchemy.dialects.postgresql import UUID
import uuid

def generate_uuid():
    return str(uuid.uuid4())


class Company(Base):
    __tablename__ = 'companies'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    address = Column(TEXT)
    size = Column(Integer)

    users = relationship("User", back_populates="company")
    agents = relationship("Agent", back_populates="company")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), index=True)
    last_name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    is_active = Column(Boolean, default=False)
    is_admin = Column(Boolean, default=False)
    is_verified = Column(Boolean, default=False)
    company_id = Column(Integer, ForeignKey("companies.id"))
    created_at = Column(DateTime(timezone=True), default=datetime.now())

    company = relationship("Company", back_populates="users")
    audios = relationship("Audio", back_populates="user")

class Agent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), index=True)
    last_name = Column(String(255), index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    aud_id = Column(Integer, index=True)

    audios = relationship("Audio")
    company = relationship("Company", back_populates="agents")

class Audio(Base):
    __tablename__ = "audios"
    id = Column(Integer, primary_key=True, index=True)
    audio_path = Column(TEXT)
    filename = Column(TEXT,  nullable = True)
    job_id = Column(String(255), index=True)
    timestamp = Column(DateTime, index=True, default=datetime.now())
    size = Column(Integer, index=True)
    duration = Column(Integer, index=True)
    transcript = Column(TEXT, nullable = True)
    positivity_score = Column(Float, index=True, nullable = True)
    negativity_score = Column(Float, index=True, nullable = True)
    neutrality_score = Column(Float, index=True, nullable = True)
    overall_sentiment = Column(Enum("Positive", "Negative", "Neutral"), index=True, nullable = True)
    most_positive_sentences = Column(JSON, nullable = True)
    most_negative_sentences = Column(JSON, nullable = True)
    agent_id = Column(Integer, ForeignKey("agents.id"))
    agent_firstname = Column(String(255), index=True)
    agent_lastname = Column(String(255), index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    job = relationship("Job", back_populates="audio", uselist=False)
    user = relationship("User", back_populates="audios")

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, index=True, default=datetime.now())
    job_status = Column(TEXT)
    audio_id = Column(Integer, ForeignKey("audios.id"))
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
    user_id = Column(Integer, ForeignKey("users.id"))
    
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

    agent_id = Column(Integer, ForeignKey("agents.id"))

class UserProfile(Base):
    __tablename__ = "accounts"

    id = Column(Integer, ForeignKey("users.id"), nullable=True)
    phone_number = Column(String(255))
    company_address = Column(TEXT)
    email = Column(String(255), nullable=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    company_logo_url = Column(URLType, nullable=True)
    api_key = Column(String(255), name="uuid", primary_key=True, default=generate_uuid)


class FreeTrial(Base):
    __tablename__ = "FreeTrial"

    id = Column(Integer, primary_key=True, index=True)
    transcript_id = Column(String(255), index=True)
    transcript_status = Column(TEXT)
