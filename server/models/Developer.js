const mongoose = require("mongoose");

const DeveloperSchema = new mongoose.Schema(
  {
    developerId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    joiningDate: { type: Date, default: Date.now },
    status: { type: String, default: "Active" },
    createdByAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Developer || mongoose.model("Developer", DeveloperSchema);
