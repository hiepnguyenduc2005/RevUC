import chromadb
import os
import asyncio
from connect import trial_collection

storage_path = os.path.join(os.getcwd())
if storage_path is None:
    raise ValueError("STORAGE_PATH environment variable is not set")

client = chromadb.PersistentClient(path=storage_path)
collection = client.get_or_create_collection(name="revuc")

async def main():
    trials_cursor = trial_collection.find({})
    trials = await trials_cursor.to_list(length=None) 
    for trial in trials:
        trial_id = str(trial.pop("_id", None))  
        trial["id"] = trial_id  
        collection.add(
            ids=[trial_id],  
            documents=[str(trial)]  
        )
        print(f"Trial {trial_id} inserted into ChromaDB")

asyncio.run(main())




