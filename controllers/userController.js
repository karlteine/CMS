const User = require("../models/User");

const userController = {
    signup: async (req, res) => {
        const { name, email, password, role } = req.body;

        try {
            // Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send("Email already registered");
            }

            // Create a new user
            const newUser = new User({ name, email, password, role });
            await newUser.save();

            // Redirect to home page after successful signup
            res.redirect("/home");
        } catch (err) {
            console.error("Error during user signup:", err);
            res.status(500).send("Internal Server Error");
        }
    },
};

module.exports = userController;
