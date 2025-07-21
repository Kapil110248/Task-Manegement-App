const Task = require("../models/task");
const Developer = require("../models/Developer");
const bcrypt = require("bcryptjs");

const getMyTasks = async (req, res) => {
  try {
    const developerId = req.developer._id; // ✅ logged-in developer ID

    const tasks = await Task.find({ developerId }).sort({
      createdDateTime: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching developer tasks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getDeveloperProfile = async (req, res) => {
  try {
    const developerId = req.developer._id; // ✅ fixed

    const developer = await Developer.findById(developerId); // show all fields including password
    console.log("➡️ req.developer:", req.developer);

    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    res.status(200).json(developer);
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status, time } = req.body;

    const task = await Task.findOne({ taskId }); // ✅ use custom ID

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;

    if (status === "Completed") {
      task.taskCompletionDateTime = time;
    } else if (status === "In Progress") {
      task.taskProcessingDateTime = time;
    }

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const developer = req.developer;

    // Validate fields
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, developer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    developer.password = hashedPassword;
    await developer.save();

    res.json({ message: "Password changed successfully ✅" });
  } catch (err) {
    console.error("Password change error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMyTasks,
  updateTaskStatus,
  getDeveloperProfile,
  changePassword,
};
