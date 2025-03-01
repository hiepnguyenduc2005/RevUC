from fastapi import APIRouter
from backend.db.connect import org_collection, user_collection, match_collection

router = APIRouter()

@router.get("/")
def get_root():
    return {"message": "Welcome to RevUC!"}

@router.post("/login-org")
def login():
    return {"message": "Login Organization"}

@router.post("/signup-org")
def signup():
    return {"message": "Signup Organization"}

@router.post("/trials")
def create_trial():
    return {"message": "Create Trial"}

@router.get("/orgs/{org_id}/")
def get_trials_for_org():
    return {"message": "Get Trials for Organization"}

@router.get("/trials/{trial_id}")
def get_match_for_trial():
    return {"message": "Get Matched Users for Trial"}

@router.get("/trials/{trial_id}/approved")
def get_approve_for_trial():
    return {"message": "Get Approved Users for Trial"}

@router.post("/match?trial={trial_id}&user_id={user_id}")
def match():
    return {"message": "Match"}

@router.post("/approve?match_id={match_id}")
def approve():
    return {"message": "Approve"}

@router.post("/reject?match_id={match_id}")
def reject():
    return {"message": "Reject"}