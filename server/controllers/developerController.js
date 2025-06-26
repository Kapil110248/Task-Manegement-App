const Task = require("../models/task");



const getMyTasks = async (req, res) => {
  try {
    const developerId = req.developer._id; // ✅ logged-in developer ID

    const tasks = await Task.find({ developerId }).sort({ createdDateTime: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching developer tasks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status, time } = req.body;

    const task = await Task.findById(taskId); // ✅ fixed

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


module.exports = {
  getMyTasks,
  updateTaskStatus,
};
