// routes/mainRoutes.js
const express = require('express');
const router = express.Router();

// Render the home page
router.get('/', (req, res) => {
    res.render('index'); 
});

// Render sign-up, student and instructor logins
router.get('/signup', (req, res) => {
    res.render('layouts/sign-up', { layout: false });
});

router.get('/student-login', (req, res) => {
    res.render('layouts/student_login', { layout: false });
})

router.get('/instructor-login', (req, res) => {
    res.render('layouts/instructor_login', { layout: false });
})

module.exports = router;
