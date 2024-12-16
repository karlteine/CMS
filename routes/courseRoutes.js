const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Profile routes
router.get('/course/:id', courseController.viewCourse);
router.post('/enroll/:id', courseController.enrollCourse);

module.exports = router;
