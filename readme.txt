Task Manager - MERN Stack Project

===========================
📁 Project Overview
===========================
This is a full-stack Task Manager application built with the MERN stack (MongoDB, Express.js, React, Node.js). 
It allows users to create, update, delete, and reorder tasks with a clean and responsive UI.

===========================
📦 Folder Structure
===========================
task-manager/
├── client/                     # React frontend (Vite + Tailwind CSS)
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Static assets like images
│   │   ├── components/         # Reusable UI components (TaskForm, TaskList, etc.)
│   │   ├── context/            # Context API logic (TaskContext, ThemeContext)
│   │   ├── hooks/              # Custom hooks (e.g., useLocalStorage)
│   │   ├── services/           # API calls to backend (taskService.js)
│   │   ├── App.jsx             # Root component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── .env                    # Frontend environment variables
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration

└── server/                     # Node.js + Express backend
    ├── controllers/            # Controllers (taskController.js)
    ├── models/                 # Mongoose models (Task.js)
    ├── routes/                 # Routes (tasks.js)
    ├── config/                 # DB config (db.js)
    ├── index.js                # Entry point for backend
    ├── .env                    # Backend environment variables
    └── package.json            # Backend dependencies

===========================
⚙️ Environment Variables
===========================
Frontend `.env` (client/.env):
----------------------------------
VITE_API_URL=http://localhost:5000/api

Backend `.env` (server/.env):
----------------------------------
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
CORS_ORIGIN=http://localhost:5173

===========================
🚀 How to Run
===========================
1. Clone the repository

2. Backend Setup:
   - Navigate to `server/`
   - Run `npm install` or `npm install --force`
   - Create `.env` file (see above)
   - Run server: `npx nodemon index.js`

3. Frontend Setup:
   - Navigate to `client/`
   - Run `npm install` or `npm install --force`
   - Create `.env` file (see above)
   - Run dev server: `npm run dev`

===========================
🛠️ Features
===========================
✔ Add Task  
✔ Mark as Completed  
✔ Delete Task  
✔ Filter (All / Active / Completed)  
✔ Drag and Drop Reordering  
✔ Clear Completed Tasks  
✔ Dark Mode Support

===========================
👩‍💻 Built By
===========================
Khushi Gupta - Full Stack Developer (MERN)
