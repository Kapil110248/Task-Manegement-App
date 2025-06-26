const Admin = require("../models/admin");
const Developer = require("../models/developer");
const Task = require("../models/task");
const bcrypt = require("bcryptjs");

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, contact, username, password } = req.body;

    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      contact,
      username,
      password: hashedPassword,
      avatar: req.file?.filename || "",
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Admin Registration Error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ✅ ADD DEVELOPER
exports.addDeveloper = async (req, res) => {
  try {
    const { developerId, fullName, email, phone, role, password, joiningDate } = req.body;

    if (!developerId || !fullName || !email || !phone || !role || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const exists = await Developer.findOne({
      $or: [{ email }, { developerId }],
    });
    if (exists) {
      return res.status(400).json({ message: "Developer ID or email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newDev = await Developer.create({
      developerId,
      fullName,
      email,
      phone,
      role,
      password: hashed,
      joiningDate: joiningDate || new Date(),
      status: "Active",
      createdByAdmin: req.admin._id, // ✅ link developer to admin
    });

    const { password: pw, ...devWithoutPw } = newDev.toObject();
    res.status(201).json(devWithoutPw);
  } catch (error) {
    console.error("Error adding developer:", error);
    res.status(500).json({ message: "Failed to add developer" });
  }
};

// ✅ GET ALL DEVELOPERS created by this admin
exports.getAllDevelopers = async (req, res) => {
  try {
    const developers = await Developer.find({ createdByAdmin: req.admin._id });
    res.json(developers);
  } catch (error) {
    console.error("Error getting developers:", error);
    res.status(500).json({ message: "Failed to fetch developers" });
  }
};

// ✅ DELETE
exports.deleteDeveloper = async (req, res) => {
  await Developer.findByIdAndDelete(req.params.id);
  res.send("Developer deleted");
};

// ✅ ADD TASK (with createdByAdmin)


exports.addTask = async (req, res) => {
  try {
    console.log("📥 Task received:", req.body);

    const {
      taskId,
      developerId,
      developerCode,
      developerName,
      taskTitle,
      taskDeadline,
      taskCompletionDateTime,
      taskProcessingDateTime,
      createdDateTime,
      status,
    } = req.body;

    if (!developerId || !developerCode || !developerName || !taskTitle || !taskDeadline || !status) {
      return res.status(400).json({ message: "Missing required task fields" });
    }

    const newTask = new Task({
      taskId,
      developerId,
      developerUniqueId: developerCode, // ✅ this field matches schema
      developerName,
      taskTitle,
      taskDeadline,
      taskCompletionDateTime,
      taskProcessingDateTime,
      createdDateTime,
      status,
      createdByAdmin: req.admin._id,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("❌ Error adding task:", error.message);
    res.status(500).json({ message: "Failed to add task", error: error.message });
  }
};

// ✅ GET ALL TASKS created by this admin
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdByAdmin: req.admin._id }).populate("developerId");
    res.json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// ✅ GET TASKS BY DEVELOPER ID
exports.getTaskByDeveloper = async (req, res) => {
  const tasks = await Task.find({ developerId: req.params.devId });
  res.json(tasks);
};
