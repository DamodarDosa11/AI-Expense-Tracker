from fastapi import FastAPI
import joblib
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Load model once when server starts
model = joblib.load("model.pkl")

@app.get("/")
def home():
    return { "return" : "ML API is running" }

class ExpenseData(BaseModel):
    data : List[float]

@app.post("/predict")
def predict(expense : ExpenseData):
    try:
        data = expense.data

        # Convert into X format
        X = [[i + 1] for i in range(len(data))]
    
        # Predict next month
        next_month = [[len(data) + 1]]
        prediction = model.predict(next_month)

        return {
            "prediction" : float(prediction[0])
        }

    except Exception as e:
        return { "error" : e }
