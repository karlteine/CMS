const User = require("../models/User");
const bcrypt = require("bcrypt");

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

      // Start a session and store user data
      req.session.user = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      };

      console.log("Session started for user:", req.session.user);

      // Redirect to home page after successful signup
      res.redirect("/home");
    } catch (err) {
      console.error("Error during user signup:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
        // Step 1: Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found");
        }

        // Step 2: Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid password");
        }

        // Step 3: Set the session
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,  // Store the user's role in the session
        };

        // Step 4: Redirect based on user role
        if (user.role === "student") {
            res.redirect("/student/dashboard"); // Redirect to student dashboard
        } else if (user.role === "instructor") {
            res.redirect("/instructor/dashboard"); // Redirect to instructor dashboard
        } else {
            res.status(400).send("Invalid user role");
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Internal Server Error");
    }
}
};

module.exports = userController;
