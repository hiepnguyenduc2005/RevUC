from fastapi import APIRouter, HTTPException, Query
from db.connect import org_collection, user_collection, match_collection
from models.schema import Signup, Organization
import bcrypt
from bson import ObjectId

router = APIRouter()

@router.get("/")
def get_root():
    return {"message": "Welcome to RevUC!"}

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()

@router.post("/login-org")
def login_org():
    # TODO
    return {"message": "Login Organization"}

@router.post("/signup-org")
async def signup_org(org: Signup):
    # TODO
    existing_user = await org_collection.find_one({"$or": [{"username": org.username}, {"email": org.email}]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or Email already exists.")

    hashed_password = hash_password(org.password)

    new_org = Organization(
        name=org.name,
        username=org.username,
        password=hashed_password,
        email=org.email,
        trials=[]
    ).dict()

    result = await org_collection.insert_one(new_org)
    return {"message": "Signup successful", "org_id": str(result.inserted_id)}

def create_user(user):
    # TODO
    return user_collection.insert_one(user)

@router.post("/trials")
def create_trial():
    return {"message": "Create Trial"}

@router.get("/orgs/{org_id}/")
def get_trials_for_org(org_id: str):
    return {"message": f"Get Trials for Organization {org_id}"}

@router.get("/trials/{trial_id}")
def get_match_for_trial(trial_id: str):
    return {"message": f"Get Matched Users for Trial {trial_id}"}

@router.get("/trials/{trial_id}/approved")
def get_approve_for_trial(trial_id: str):
    return {"message": f"Get Approved Users for Trial {trial_id}"}

@router.post("/match/")
def match(trial_id: str = Query(...), user_id: str = Query(...)):
    return {"message": f"Match User {user_id} to Trial {trial_id}"}

@router.post("/approve/")
def approve(match_id: str = Query(...)):
    return {"message": f"Approved Match {match_id}"}

@router.post("/reject/")
def reject(match_id: str = Query(...)):
    return {"message": f"Rejected Match {match_id}"}
