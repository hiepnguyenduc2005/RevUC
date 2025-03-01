from fastapi import FastAPI
import uvicorn
from api import endpoints

app = FastAPI(title="RevUC")
app.include_router(endpoints.router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
