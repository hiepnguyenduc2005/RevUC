from fastapi import APIRouter, HTTPException, Query, Request
from db.connect import org_collection, user_collection, match_collection, trial_collection
from models.schema import Signup, Organization, Login, User, NewUser, Trial, Match, NewMatch
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
async def login_org(org: Login):
    email = org.email
    password = org.password

    user = await org_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid information")
    
    if not bcrypt.checkpw(password.encode(), user["password"].encode()):
        raise HTTPException(status_code=400, detail="Invalid information")
    
    return {"name": user["name"], "email": user["email"], "id": str(user["_id"])}


@router.post("/signup-org")
async def signup_org(org: Signup):
    existing_user = await org_collection.find_one({"email": org.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists.")

    hashed_password = hash_password(org.password)

    new_org = Organization(
        name=org.name,
        password=hashed_password,
        email=org.email,
        trials=[]
    ).dict()

    result = await org_collection.insert_one(new_org)
    return {"name": org.name, "email": org.email, "id": str(result.inserted_id)}

@router.post("/create-user")
async def create_user(user: NewUser):
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists.")
    
    new_user = User(
        name=user.name,
        email=user.email,
        report=""
    ).dict()
    result = await user_collection.insert_one(new_user)
    print(result)
    return {"message": "Create successful", "id": str(result.inserted_id)}
    
@router.post("/trials")
async def create_trial(trial: Trial):
    existing_trial = await trial_collection.find_one({"title": trial.title})
    if existing_trial:
        raise HTTPException(status_code=400, detail="A trial with that title already exists.")

    new_trial = trial.dict()

    result = await trial_collection.insert_one(new_trial)

    return {
        "contactName": trial.contactName,
        "contactPhone": trial.contactPhone,
        "title": trial.title,
        "description": trial.description,
        "startDate": trial.startDate,
        "endDate": trial.endDate,
        "compensation": trial.compensation,
        "location": trial.location,
        "eligibilityCriteria": trial.eligibilityCriteria,
        "org_ID": str(trial.org_ID),
        "id": str(result.inserted_id)
    }
    
@router.get("/orgs/{org_id}")
async def get_trials_for_org(org_id: str):
    
    org_exists = await org_collection.find_one({"_id": ObjectId(org_id)})
    if not org_exists:
        raise HTTPException(status_code=404, detail="Organization not found")

    trials_cursor = trial_collection.find({"org_ID": org_id})
    trials = await trials_cursor.to_list(length=None)


    for trial in trials:
        trial["_id"] = str(trial["_id"])

    return {
        "organization_id": org_id,
        "trials": trials
    }

@router.post("/test")
async def create_match(newMatch: NewMatch):
    trial_id = newMatch.trial_id
    user_id = newMatch.user_id
    try:
        trial = await trial_collection.find_one({"_id": ObjectId(trial_id)})
        if not trial:
            raise Exception("Trial not found")

        user = await user_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise Exception("User not found")

        existing_match = await match_collection.find_one({"trial_id": trial_id, "user_id": user_id})
        if existing_match:
            raise Exception("Match already exists")

        match_doc = Match(
            trial_id= trial_id,
            user_id=user_id,
            status="pending"  
        ).dict()

        result = await match_collection.insert_one(match_doc)
        return {"message": "Match created", "id": str(result.inserted_id) }

    except Exception as e:
        print(e)
        return {"message": str(e)}



@router.get("/trials/{trial_id}")
async def get_match_for_trial(trial_id: str):
    matches_cursor = match_collection.find({"trial_id": trial_id})
    matches = await matches_cursor.to_list(length=None)  
    result = [
        {
            "user_id": match.get("user_id"), 
            "match_id": str(match.get("_id")),
            "status": match.get("status", "pending")  # Include status field with default
        } 
        for match in matches
    ]
    return {"message": "Get Users for Trial", "matches": result}

@router.post("/approve/{match_id}")
async def approve(match_id: str):
    match = await match_collection.find_one({"_id": ObjectId(match_id)})
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    await match_collection.update_one({"_id": ObjectId(match_id)}, {"$set": {"status": "approved"}})

    return {"message": f"Approved Match {match_id}"}

@router.post("/reject/{match_id}")
async def reject(match_id: str):
    match = await match_collection.find_one({"_id": ObjectId(match_id)})
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    await match_collection.update_one({"_id": ObjectId(match_id)}, {"$set": {"status": "rejected"}})
    return {"message": f"Rejected Match {match_id}"}

@router.get("/users/{user_id}")
async def get_user(user_id: str):
    user = await user_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user_without_id = user.copy()
    del user_without_id["_id"]
    return {"message": "Get User", "user": user_without_id}