const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    taskId: String,
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developer",
    },
    developerUniqueId: String,
    developerName: String,
    developerAvatar: String,
    taskTitle: String,
    taskDescription: String,
    taskDeadline: { type: Date },
    taskCompletionDateTime: { type: Date },
    taskProcessingDateTime: { type: Date },
    createdDateTime: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    createdByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);