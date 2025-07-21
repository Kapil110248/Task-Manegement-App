const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Developer = require("../models/Developer");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const otpStore = new Map();

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, "adminLoginKey", {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ✅ Developer Login (Updated)
exports.loginDeveloper = async (req, res) => {
  const { email, password } = req.body;

  try {
    const developer = await Developer.findOne({ email });

    if (!developer) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, developer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: developer._id }, "developerLoginKey", {
      expiresIn: "1h",
    });

    // ✅ Return token and developer object
    res.json({
      token,
      developer: {
        _id: developer._id,
        fullName: developer.fullName,
        email: developer.email,
        developerId: developer.developerId,
        role: developer.role,
        avatar: developer.avatar,
        joiningDate: developer.joiningDate,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
exports.verifyOtpAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const savedOtp = otpStore.get(email);
  if (!savedOtp || savedOtp.toString() !== otp.toString()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updated = await Admin.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    if (!updated) {
      return res.status(404).json({ message: "Admin not found" });
    }

    otpStore.delete(email); // Clean up OTP after use
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ message: "Failed to reset password" });
  }
};
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  otpStore.set(email, otp);

  // Send OTP via email
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // your Gmail from .env
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your OTP for password reset",
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};
