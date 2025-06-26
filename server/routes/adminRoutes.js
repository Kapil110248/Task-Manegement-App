const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuth } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// 🔓 PUBLIC route now (no adminAuth)
router.post('/create-admin', upload.single('avatar'), adminController.createAdmin);

// 👇 Protected routes (no changes)
router.post('/add-developer', adminAuth, upload.single('avatar'), adminController.addDeveloper);
router.get('/developers', adminAuth, adminController.getAllDevelopers);
router.post('/add-task', adminAuth, adminController.addTask);
router.get('/tasks', adminAuth, adminController.getAllTasks);
router.delete('/delete-developer/:id', adminAuth, adminController.deleteDeveloper);
router.get('/tasks/:devId', adminAuth, adminController.getTaskByDeveloper);

module.exports = router;
