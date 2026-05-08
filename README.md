# 🛡️ Cybersecurity Phishing Scanner

An AI-powered phishing email detection dashboard built using **React.js** and **FastAPI**.  
This project helps detect suspicious phishing emails and generates a real-time risk score based on phishing-related keywords and patterns.

---

## 🚀 Features

- 🔍 Scan suspicious emails
- ⚠️ Detect phishing-related content
- 📊 Generate risk score
- 🌐 Full-stack frontend + backend integration
- ⚡ Real-time API communication
- 🎨 Modern responsive dashboard UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML/CSS

### Backend
- Python
- FastAPI
- Uvicorn

### Other Tools
- Git & GitHub
- VS Code

---

## 📂 Project Structure

```bash
cybersecurity-phishing-scanner/
│
├── frontend/
│   ├── src/
│   ├── package.json
│
├── backend/
│   ├── app.py
│   ├── train.py
│   ├── models/
│   ├── data/
│
├── README.md
└── requirements.txt

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/himanshu-04022006/cybersecurity-phishing-scanner.git

2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
python -m uvicorn app:app --reload

Backend runs on:
http://127.0.0.1:8000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5174

<img width="960" height="402" alt="Screenshot 2026-05-08 160350" src="https://github.com/user-attachments/assets/9d4e28ec-d75d-42f7-83c9-dab786f4976a" />
<img width="688" height="410" alt="Screenshot 2026-05-08 161145" src="https://github.com/user-attachments/assets/981dc5a0-96d1-4e25-88a8-eeeda904e0f9" />

🧠 How It Works
User pastes suspicious email content
Frontend sends email data to FastAPI backend
Backend analyzes phishing-related keywords
Risk score is generated
Result is displayed on dashboard

🔮 Future Improvements
Machine Learning based phishing detection
URL reputation scanning
Email header analysis
Dark mode UI
Database integration
Deployment on cloud platforms

👨‍💻 Author
Himanshu Sahu

Cybersecurity Student | Python & Web Development Enthusiast

LinkedIn: www.linkedin.com/in/himanshu-sahu-a134a0283
GitHub: https://github.com/himanshu-04022006
