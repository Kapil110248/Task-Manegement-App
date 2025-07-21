const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { adminAuth } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/create-admin",
  upload.single("avatar"),
  adminController.createAdmin
);

// 👇 Protected routes (no changes)
router.post(
  "/add-developer",
  adminAuth,
  upload.single("avatar"),
  adminController.addDeveloper
);
router.get("/developers", adminAuth, adminController.getAllDevelopers);
router.get("/profile", adminAuth, adminController.getAdminProfile);
router.put("/update-profile", adminAuth, adminController.updateAdminProfile);

router.put(
  "/update-task-status/:taskId",
  adminAuth,
  adminController.updateTaskStatus
);
router.put(
  "/update-developer/:id",
  adminAuth,
  adminController.updateDeveloper // 👈 this line missing
);

router.put("/update-task/:taskId", adminAuth, adminController.updateTask); // ✨ ADD THIS

router.post("/add-task", adminAuth, adminController.addTask);
router.get("/tasks", adminAuth, adminController.getAllTasks);
router.delete(
  "/delete-developer/:id",
  adminAuth,
  adminController.deleteDeveloper
);
router.delete("/delete-task/:taskId", adminAuth, adminController.deleteTask);
router.delete("/delete-profile", adminAuth, adminController.deleteAdminProfile);

router.get("/tasks/:devId", adminAuth, adminController.getTaskByDeveloper);

module.exports = router;
