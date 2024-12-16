// routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const navigationController = require('../controllers/navigationController');

// Render the home page
router.get('/', (req, res) => {
    res.render('index'); 
});

// Render sign-up, student and instructor logins
router.get('/signup', (req, res) => {
    res.render('layouts/sign-up', { layout: false });
});

router.get('/contact', navigationController.getUser);


router.get('/search', async (req, res) => {
    try {
        // Call getFilteredCourses to fetch the filtered courses
        await navigationController.getAllCourses(req, res);
    } catch (err) {
        console.error("Error rendering student dashboard:", err);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;
