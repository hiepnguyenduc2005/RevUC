from pydantic import BaseModel
from typing import Literal

class User(BaseModel):
    id: str
    name: str
    username: str
    password: str
    email: str

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
    email: str
    trials: list[Trial]

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
    email: str