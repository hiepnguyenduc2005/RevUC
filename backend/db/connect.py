import os
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
db = client.revuc
org_collection = db.get_collection("organizations")
user_collection = db.get_collection("users")
match_collection = db.get_collection("matches")