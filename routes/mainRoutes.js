// routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const { getFilteredCourses, getAllCourses } = require('../controllers/courseController');

// Render the home page
router.get('/', (req, res) => {
    res.render('index'); 
});

// Render sign-up, student and instructor logins
router.get('/signup', (req, res) => {
    res.render('layouts/sign-up', { layout: false });
});


router.get('/home', getAllCourses);

router.get('/contact', (req, res) => {
    res.render('layouts/contact', { layout: false });
})

module.exports = router;
