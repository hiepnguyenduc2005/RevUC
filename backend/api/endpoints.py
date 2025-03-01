from fastapi import APIRouter, HTTPException, Query
from db.connect import org_collection, user_collection, match_collection

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
