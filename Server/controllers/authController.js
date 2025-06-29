const crypto = require("crypto");
const User = require("../models/User");
const { sendEmail } = require("../utils/mailer");


//  Signup section wnc
exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" }); // checking passwaord 
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User or Email already exists" }); // checking email if it's already exist
    }

    const user = new User({ username, email });
    user.password = password;
    await user.save(); // save

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// login section
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 3600000; // 1 hour

    // store token temporarily in db
    user.resetToken = token;
    user.resetTokenExpires = expires;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await sendEmail({
      to: user.email,
      subject: "Reset Your Clevora Password",
      html: `
        <h3>Password Reset Request</h3>
        <p>Click below to reset your password. This link will expire in 1 hour.</p>
        <a href="${resetLink}" style="padding: 10px 20px; background-color: #facc15; color: black; border-radius: 6px; display: inline-block;">Reset Password</a>
        <p>If you didn't request this, you can ignore this email.</p>
      `,
    });

    res.json({ message: "Reset link sent" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
