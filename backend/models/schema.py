from pydantic import BaseModel, EmailStr
from bson import ObjectId
from typing import Literal, List

class User(BaseModel):
    name: str
    email: EmailStr
    report: str

class Trial(BaseModel):
    contactName: str
    contactPhone: str
    title: str
    description: str
    startDate: str
    endDate: str
    compensation: str
    location: str
    eligibilityCriteria: list
    org_ID: str

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
    email: str
    password: str

class Signup(BaseModel):
    name: str
    password: str
    email: EmailStr

class NewUser(BaseModel):
    name: str
    email: EmailStr


class NewMatch(BaseModel):
	trial_id: str
	user_id: str