const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require("./routes/Events");

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes for signup/login
app.use("/api/auth", authRoutes);

// Event routes
app.use("/api/events", eventRoutes);

// Email Notification Cron Setup 

const cron = require("node-cron");
const Event = require("./models/Events");
const { sendReminderEmail } = require("./utils/mailer");

// Replace with actual user's email logic when auth is ready
const userEmail = "user@example.com";

const checkAndSendEventReminders = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

    const events = await Event.find({ date: { $in: [today, tomorrow] } });

    for (const event of events) {
      const when = event.date === today ? "today" : "tomorrow";
      const subject = `Reminder: "${event.title}" is ${when}`;
      const body = `Hi! Just a reminder that your event "${event.title}" is scheduled for ${event.date} (${when}).\n\n- Clevora`;

      await sendReminderEmail(userEmail, subject, body);
    }

    if (events.length > 0) {
      console.log(`✅ Reminders sent for ${events.length} event(s).`);
    }
  } catch (err) {
    console.error("❌ Failed to send reminders:", err);
  }
};

// Run at 8:00 AM every day
cron.schedule("0 8 * * *", () => {
  console.log("🔁 Running daily reminder cron job...");
  checkAndSendEventReminders();
});

// END Cron Setup 

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));
