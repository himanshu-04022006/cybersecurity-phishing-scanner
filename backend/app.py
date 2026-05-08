from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    text: str

@app.post("/score")
async def score_email(request: EmailRequest):
    email = request.text.lower()

    phishing_words = [
        "urgent", "verify", "password", "bank", "click", "login",
        "suspended", "account", "http", "winner", "lottery",
        "claim", "reward", "otp", "aadhaar", "prize",
        "congratulations", "limited", "security", "update",
        "transaction", "funds", "payment"
    ]

    score = 0

    for word in phishing_words:
        if word in email:
            score += 0.12

    score = min(score, 1.0)

    prediction = "Phishing" if score > 0.5 else "Safe"

    return {
        "prediction": prediction,
        "score": round(score, 2)
    }