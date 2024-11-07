// routes/mainRoutes.js
const express = require('express');
const router = express.Router();

// Render the home page
router.get('/', (req, res) => {
    res.render('index'); 
});

// Render sign-up, student and instructor logins
router.get('/signup', (req, res) => {
    res.render('sign-up', { layout: false });
});

router.get('/student-login', (req, res) => {
    res.render('student_login', { layout: false });
})

router.get('/instructor-login', (req, res) => {
    res.render('instructor_login', { layout: false });
})

module.exports = router;
