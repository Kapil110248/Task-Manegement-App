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
    const { developerId, fullName, email, phone, role, password, joiningDate } =
      req.body;

    if (!developerId || !fullName || !email || !phone || !role || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const exists = await Developer.findOne({
      $or: [{ email }, { developerId }],
    });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Developer ID or email already in use" });
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

    if (
      !developerId ||
      !developerCode ||
      !developerName ||
      !taskTitle ||
      !taskDeadline ||
      !status
    ) {
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
    res
      .status(500)
      .json({ message: "Failed to add task", error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdByAdmin: req.admin._id }).populate(
      "developerId",
      "fullName email"
    );
    res.json({ tasks }); // ✅ ARRAY ko object me wrap karo
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

exports.updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Failed to update task status" });
  }
};
// ✅ DELETE TASK
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ✅ Only allow deletion if this task was created by the current admin
    if (task.createdByAdmin.toString() !== req.admin._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this task" });
    }

    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
// ✅ UPDATE TASK TITLE + DEADLINE
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { taskTitle, taskDeadline } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only allow update if task was created by this admin
    if (task.createdByAdmin.toString() !== req.admin._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this task" });
    }

    task.taskTitle = taskTitle || task.taskTitle;
    task.taskDeadline = taskDeadline || task.taskDeadline;

    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("❌ Error updating task:", error.message);
    res.status(500).json({ message: "Failed to update task" });
  }
};
exports.updateDeveloper = async (req, res) => {
  try {
    const updatedDeveloper = await Developer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDeveloper) {
      return res.status(404).json({ message: "Developer not found" });
    }

    res.status(200).json({
      message: "Developer updated successfully",
      developer: updatedDeveloper,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating developer", error: error.message });
  }
};

exports.deleteDeveloper = async (req, res) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    await Developer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Developer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting developer", error: error.message });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin._id; // ✅ Correct field
    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin._id;
    const { name, email, contact } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { name, email, contact },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.deleteAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin._id;
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
