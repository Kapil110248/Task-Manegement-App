const express = require("express");
const router = express.Router();
const developerController = require("../controllers/developerController");
const { developerAuth } = require("../middleware/authMiddleware");

router.get("/tasks", developerAuth, developerController.getMyTasks);
router.get("/profile", developerAuth, developerController.getDeveloperProfile);
router.put(
  "/change-password",
  developerAuth,
  developerController.changePassword
);

router.put(
  "/tasks-status/:taskId",
  developerAuth,
  developerController.updateTaskStatus
);

module.exports = router;
