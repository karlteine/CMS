const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Profile routes
router.get('/profile', profileController.getProfile);
router.get('/profile/edit', profileController.editProfile);
router.post('/profile/edit', profileController.updateProfile);
router.get("/profile/change-password", profileController.renderChange);
router.post("/profile/change-password", profileController.changePassword);

router.get('/logout', profileController.logout);

module.exports = router;
