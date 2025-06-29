# 🗓️ Smart Event Calendar (Full Stack)

**Smart Event Calendar** is a full-stack web application that allows users to create, view, and manage events. It also includes a notification system that sends reminders via email or WhatsApp the day before and on the day of the event.

> 🚧 **This project is under active development.**

---

## 🔥 Features

- 📝 User registration & login
- 🔐 JWT-based authentication
- 📅 Calendar with interactive UI
- 🗂️ Add, edit, delete events
- 🔔 Notifications (email/WhatsApp) for upcoming events
- 📆 Highlighted event days on calendar
- ✅ Responsive and user-friendly interface
- 📨 Message/chat box feature for communication
- 📁 Organized monorepo structure (client & server)

---

## 🧰 Technologies Used

### 🔹 Frontend (React)

- React.js (TypeScript)
- Tailwind CSS for styling
- React Router for routing
- React Modal / Calendar libraries
- Axios for API calls

### 🔹 Backend (Node.js & Express)

- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for auth
- dotenv for environment management
- nodemailer (or similar) for email
- Twilio / WhatsApp API integration _(planned)_

---

## 📁 Project Structure

smart-event-calendar/
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── ...
├── server/ # Node.js backend
│ ├── routes/
│ ├── controllers/
│ └── ...
└── README.md

---

## 🚀 Getting Started

### 🔧 Backend Setup

```bash
cd server
npm install
npm run dev

---- Create a .env file with:

MONGO_URI=mongodb://127.0.0.1:27017/smart_event_db
PORT=5000
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password_here


---
## 🔧 Frontend Setup


cd client
npm install
npm run dev



--------------
📌 Status
--------------
✅ Core features working

🔜 Notifications system (WhatsApp) in progress

🔧 UI refinements ongoing

🧪 Testing to be added


------------
📬 Contact
------------

For more information or collaboration, reach out via email:

📧 chamithnmaduranga45@gmail.com
```
