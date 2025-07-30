
# Wellness Session Platform

A full-stack web application that allows users to register, log in, create/edit wellness sessions (like yoga or meditation), save them as drafts, and publish them. Includes **auto-save**, **JWT authentication**, and a **responsive UI**.

## 🚀 Live Demo
- **Frontend:** [https://arvyax-frontend.vercel.app](https://arvyax-frontend.vercel.app)
- **Backend API:** [https://arvyax-backend.onrender.com](https://arvyax-backend.onrender.com)

## ✨ Features
- **User Authentication:** Secure registration & login with hashed passwords and JWT-based sessions.
- **Session Management:** Create, edit, draft, and publish wellness sessions.
- **Auto-Save:** Drafts automatically save after 5 seconds of inactivity.
- **Responsive UI:** Optimized for mobile, tablet, and desktop.
- **Toast Feedback:** Instant user feedback for actions (save, publish, errors).
- **Protected Routes:** Access control using JWT.

## 🛠 Tech Stack
- **Frontend:** React.js, Vite, TailwindCSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT, bcrypt
- **Deployment:** Vercel (Frontend), Render (Backend)

## 📂 Project Structure
```
/client     # React + Vite frontend
/server        # Node.js + Express backend
```

## 🔑 API Endpoints

### Auth
- `POST /api/auth/register` – Register new user  
- `POST /api/auth/login` – Login & receive JWT  

### Sessions
- `GET /api/sessions` – Get all public sessions  
- `GET /api/sessions/my-sessions` – Get current user's sessions  
- `GET /api/sessions/my-sessions/:id` – Get a single user session  
- `POST /api/sessions/my-sessions/save-draft` – Save or update a draft  
- `POST /api/sessions/my-sessions/publish` – Publish a session  

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/RoopTeja04/Arvyax_Full_Stack_App.git
cd Arvyax_Full_Stack_App
```

### 2. Backend setup
```bash
cd server
cp .env.example .env   # add your MongoDB & JWT secrets
npm install
npm start
```

### 3. Frontend setup
```bash
cd frontend
cp .env.example .env   # set API base URL
npm install
npm run dev
```

## 🔧 Environment Variables

### Backend (`server/.env`)
```
MONGODB_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=https://arvyax-backend.onrender.com/api
```

## 📜 License
This project is for educational purposes (Arvyax Full Stack Internship Assignment).