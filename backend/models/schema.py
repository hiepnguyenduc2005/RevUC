from pydantic import BaseModel, EmailStr
from typing import Literal, List

class User(BaseModel):
    id: str
    name: str
    email: EmailStr

class Trial(BaseModel):
    id: str
    org_id: str
    title: str
    description: str
    eligibility: str
    start_date: str
    end_date: str
    compensation: str
    location: str

class Organization(BaseModel):
    id: str
    name: str
    username: str
    password: str
    email: EmailStr
    trials: List[Trial] = []

class Match(BaseModel):
    id: str
    trial_id: str
    user_id: str
    status: Literal["pending", "approved", "rejected"]

class Login(BaseModel):
    username: str
    password: str

class Signup(BaseModel):
    name: str
    username: str
    password: str
    email: EmailStr