from datetime import datetime
from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, EmailStr

class Company(BaseModel):
    id: int
    name: str
    size: int

class Users(BaseModel):
    id: int
    firstname: str
    lastname: str
    email: EmailStr
    password: str
    company_id: int
    is_verified: bool
    is_admin: bool


class Agents(BaseModel):
    id: int
    first_name: str
    last_name: str
    agent_code: int
    company_id: int

class Audio(BaseModel):
    id: int
    audio_path: str
    upload_date: datetime
    transcript: str
    agents_id: int


class JobStatus(str, Enum):
    in_progress = "in_progress"
    success = "success"
    failed = "failed"

class Job(BaseModel):
    id: int
    created_at: datetime
    jobStatus: JobStatus.in_progress
    audio_id: int

class FriendlyAnalysis(BaseModel):
    id: int
    score: int
    start_time: datetime
    end_time: datetime
    audio_analysis_id: int

class GrammerAnalysis(BaseModel):
    id: int
    start_time: datetime
    end_time: datetime
    audio_analysis_id: int


class AngerAnalysis(BaseModel):
    id: int
    start_time: datetime
    end_time: datetime
    audio_analysis_id: int


class CallDurationAnalysis(BaseModel):
    id: int
    start_time: datetime
    end_time: datetime
    audio_analysis_id: int


class AudioAnalysis(BaseModel):
    id: int
    audio_id: int

class AudioAnalysisSchema(AudioAnalysis):
    friendly_analysis: List[FriendlyAnalysis]
    grammatical_analysis: List[GrammerAnalysis]
    anger_analysis: List[AngerAnalysis]
    call_duration_analysis: List[CallDurationAnalysis]



