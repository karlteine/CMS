const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Render the signup form
router.get("/signup", (req, res) => {
    res.render("signup", { layout: false });
});

// Handle signup form submission
router.post("/signup", userController.signup);

module.exports = router;
