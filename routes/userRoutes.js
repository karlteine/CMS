const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const courseController = require("../controllers/courseController");
const { checkStudentRole, checkInstructorRole } = require("../controllers/roleController");

// Render the signup form
router.get("/signup", (req, res) => {
    res.render("signup", { layout: false });
});

// Handle signup form submission
router.post("/signup", userController.signup);

router.get('/login', (req, res) => {
    res.render('layouts/login', { layout: false });
})
router.post("/login", userController.login);

// Student Dashboard Route
router.get("/student/dashboard", checkStudentRole, async (req, res) => {
    try {
        // Call getFilteredCourses to fetch the filtered courses
        await courseController.getFilteredCourses(req, res);
    } catch (err) {
        console.error("Error rendering student dashboard:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Instructor Dashboard Route
router.get("/instructor/dashboard", checkInstructorRole, async (req, res) => {
    try {
        // Call getFilteredCourses to fetch the filtered courses
        await courseController.getFilteredCourses(req, res);
    } catch (err) {
        console.error("Error rendering instructor dashboard:", err);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = router;
