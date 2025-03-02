from pydantic import BaseModel, EmailStr
from typing import Literal, List

class User(BaseModel):
    name: str
    email: EmailStr

class Trial(BaseModel):
    org_id: str
    title: str
    description: str
    eligibility: str
    start_date: str
    end_date: str
    compensation: str
    location: str

class Organization(BaseModel):
    name: str
    password: str
    email: EmailStr
    trials: List[Trial] = []

class Match(BaseModel):
    trial_id: str
    user_id: str
    status: Literal["pending", "approved", "rejected"]

class Login(BaseModel):
    email: EmailStr
    password: str

class Signup(BaseModel):
    name: str
    password: str
    email: EmailStr