const express = require("express");
const router = express.Router();
const createCourseController = require("../controllers/createCourseController");
const { checkInstructorRole } = require("../controllers/roleController");

// Display course creation form (GET)
router.get("/course-creation", checkInstructorRole, (req, res) => {
    res.render("layouts/course-creation", { layout: false });
  });
  
// Handle course creation (POST)
router.post("/course-creation", checkInstructorRole, createCourseController.createCourse);
  
module.exports = router;
