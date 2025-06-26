const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contact: String,
    username: String,
    password: String,
    avatar: String,
    createdDateTime: { type: Date, default: Date.now },
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

// Fix: Use existing model if already compiled
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

module.exports = Admin;
