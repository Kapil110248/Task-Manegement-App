const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/admin-login", authController.loginAdmin);
router.post("/developer-login", authController.loginDeveloper);
// ✅ OTP Forgot Password flow
router.post("/send-otp", authController.sendOtp); // Send OTP to admin email
router.post("/verify-otp-reset", authController.verifyOtpAndResetPassword); // Verify OTP and reset password

module.exports = router;
