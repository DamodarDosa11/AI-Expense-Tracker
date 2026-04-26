# 💸 AI-Powered Expense Tracker

A full-stack expense management application enhanced with **machine learning-based predictions** to provide users with insights into their future spending.

---

## 🚀 Project Overview

This project is a modern **AI-integrated expense tracking system** that allows users to:

* Track daily expenses
* Visualize spending patterns
* Predict future expenses using a machine learning model

The system is designed using a **microservices architecture**, separating core application logic and ML prediction services.

---

## 🧠 Key Features

### 📊 Expense Management

* Add, update, and delete expenses
* Categorize spending
* Store data securely

### 📈 Dashboard & Insights

* View expenses in structured format
* Monthly aggregation of expenses
* Data ready for analytics and visualization

### 🤖 AI Prediction Engine (NEW)

* Predicts **next month’s expense**
* Built using **Linear Regression**
* Uses historical monthly expense data
* Exposed via FastAPI endpoint (`/predict`)

---

## 🏗️ Architecture

```text
Frontend (Next.js)
        ↓
Backend (Node.js)
        ↓
ML Service (FastAPI)
        ↓
Machine Learning Model (model.pkl)
```

* **Frontend** → UI & user interaction
* **Backend** → Business logic & API handling
* **ML Service** → Prediction engine using Python
* **Model** → Trained on aggregated monthly expense data

---

## 🧩 Tech Stack

### 🌐 Frontend

* Next.js
* Tailwind CSS

### ⚙️ Backend

* Node.js
* Express.js

### 🤖 Machine Learning Service

* Python
* FastAPI
* pandas
* scikit-learn
* joblib

---

## 📁 Project Structure

```text
AI-Expense-Tracker/
│
├── frontend/
├── backend/
├── ml-service/
│   ├── model.ipynb
│   ├── model.pkl
│   ├── app.py
│   ├── requirements.txt
│   └── venv/
│
├── .gitignore
└── README.md
```

---

## 🔬 Machine Learning Workflow

### 1. Data Preparation

* Raw expense data (timestamp + amount)
* Extracted **month from timestamp**
* Aggregated expenses into **monthly totals**

### 2. Model Training

* Used **Linear Regression**
* Input (X): Month index
* Output (y): Monthly expense total

### 3. Prediction

* Predicts next month’s expense using trained model

### 4. Model Persistence

* Saved using `joblib` → `model.pkl`

---

## ⚙️ FastAPI ML Service

### ▶️ Run ML Service

```bash
cd ml-service
venv\Scripts\activate   # Windows
uvicorn app:app --reload
```

### 📡 API Endpoint

#### POST `/predict`

**Request:**

```json
{
  "data": [10000, 12000, 11000, 13000]
}
```

**Response:**

```json
{
  "prediction": 13500
}
```

---

## 🧠 Key Concepts Implemented

* Data aggregation (daily → monthly)
* Feature engineering
* Linear regression modeling
* Model serialization (`joblib`)
* REST API for ML inference
* Microservices architecture

---

## ⚠️ Current Limitations

* Uses randomly generated/sample data
* Prediction accuracy is basic (simple model)
* No real-time retraining yet

---

## 🚀 Future Improvements

* Integrate real user data for better predictions
* Add category-wise predictions
* Improve model (Random Forest, Time Series)
* Deploy ML service to cloud
* Add CI/CD pipeline
* Enhance UI with AI insights dashboard

---

## 💼 Why This Project Stands Out

* Combines **Full Stack + Machine Learning + DevOps concepts**
* Demonstrates **end-to-end system design**
* Implements **real-world AI integration**, not just standalone ML

---

## 🤝 Contribution

Contributions, suggestions, and feedback are welcome!

---

## 📌 Author

**Damodar Dosa Sai**
Full Stack Developer | AI Enthusiast
