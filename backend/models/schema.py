from pydantic import BaseModel, EmailStr
from typing import Literal, List

class User(BaseModel):
    name: str
    email: EmailStr
    report: str

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
    username: str
    password: str
    email: EmailStr
    trials: List[Trial] = []

class Match(BaseModel):
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

class NewUser(BaseModel):
    name: str
    email: EmailStr