import os
import motor.motor_asyncio
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../.env"))

MONGODB_URL = os.getenv("MONGODB_URL")

if not MONGODB_URL:
    raise ValueError("MONGODB_URL is not set. Please check your .env file.")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
db = client.revuc

org_collection = db.get_collection("organizations")
user_collection = db.get_collection("users")
match_collection = db.get_collection("matches")
