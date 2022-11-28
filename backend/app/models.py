# models for database [SQLAlchemy]
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Enum, Float, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime

from datetime import datetime

from db import Base

from sqlalchemy.dialects.postgresql import UUID
import uuid

def generate_uuid():
    return str(uuid.uuid4())


class Company(Base):
    __tablename__ = 'companies'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    address = Column(String, index=True)
    size = Column(Integer)

    users = relationship("User", back_populates="company")
    agents = relationship("Agent", back_populates="company")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
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
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))

    audios = relationship("Audio")
    company = relationship("Company", back_populates="agents")

class Audio(Base):
    __tablename__ = "audios"

    id = Column(Integer, primary_key=True, index=True)
    audio_path = Column(String, index=True)
    timestamp = Column(DateTime, index=True, default=datetime.now())
    size = Column(Integer, index=True)
    duration = Column(Integer, index=True)
    transcript = Column(String, index=True)
    positivity_score = Column(Float, index=True)
    negativity_score = Column(Float, index=True)
    neutrality_score = Column(Float, index=True)
    overall_sentiment = Column(Enum("Positive", "Negative", "Neutral"), index=True)
    most_positive_sentences = Column(JSON, index =True, nullable = True)
    most_negative_sentences = Column(JSON, index =True, nullable = True)

    agent_id = Column(Integer, ForeignKey("agents.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    job = relationship("Job", back_populates="audio", uselist=False)
    user = relationship("User", back_populates="audios")

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, index=True, default=datetime.now())
    job_status = Column(Enum("PENDING", "SUCCESS", "FAILED"), index=True)
    audio_id = Column(Integer, ForeignKey("audios.id"))

    audio = relationship("Audio", back_populates="job")



class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)

    audio_name = Column(String, index=True)
    agent_name = Column(String, index=True)
    sentiment_result = Column(String, index=True)
    date_uploaded = Column(DateTime, default=datetime.utcnow(), index=True)
    user_id = Column(Integer, ForeignKey("users.id"))


    
class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)
    audio_path = Column(String, index=True)
    timestamp = Column(DateTime, index=True)
    transcript = Column(String, index=True)
    positivity_score = Column(Float, index=True)
    negativity_score = Column(Float, index=True)
    neutrality_score = Column(Float, index=True)
    overall_sentiment = Column(Enum("Positive", "Negative", "Neutral"), index=True)

    agent_id = Column(Integer, ForeignKey("agents.id"))

class UserProfile(Base):
    __tablename__ = "Accounts"

    id = Column(Integer, ForeignKey("users.id"), nullable=True)
    phone_number = Column(String)
    company_address = Column(String)
    email = Column(String, nullable=True)
    company_id= Column(String, ForeignKey("companies.id"))
    api_key = Column(String, name="uuid", primary_key=True, default=generate_uuid)