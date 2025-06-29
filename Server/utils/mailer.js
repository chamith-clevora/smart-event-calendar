const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//  Generalized reusable email sender
const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"Clevora" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html, 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Email failed to ${to}`, err);
    throw err;
  }
};

// reminder email 
const sendReminderEmail = async (to, subject, text) => {
  return sendEmail({ to, subject, text });
};

module.exports = { sendEmail, sendReminderEmail };
