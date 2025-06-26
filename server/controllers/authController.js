const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Developer = require("../models/Developer");
const bcrypt = require("bcryptjs");



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
