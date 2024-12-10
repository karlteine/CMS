const User = require('../models/User');
const bcrypt = require("bcrypt");

const profileController = {
    getProfile: (req, res) => {
    // Ensure the user is logged in
    if (!req.session.user) {
      return res.redirect('/'); // Redirect to login page if not logged in
    }

    // Retrieve session user details
    const sessionUser = req.session.user;

    res.render('layouts/profile', {
      sessionUser, // Pass session user to the template
      layout: false, // Optional: skip default layout
    });
},

    editProfile: (req, res) => {
    if (!req.session.user) {
      return res.redirect('/');
    }

    res.render('layouts/edit-profile', {
      sessionUser: req.session.user,
      layout: false,
    });
},

    updateProfile: async (req, res) => {
    const { name, email } = req.body;
    const userId = req.session.user.id;

    try {
        console.log('Updating user with ID:', userId);
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { name, email }, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            console.error('User not found in database.');
            return res.status(404).send('User not found');
        }

        console.log('Updated user:', updatedUser);

        req.session.user.name = updatedUser.name;
        req.session.user.email = updatedUser.email;

        console.log('Updated session user:', req.session.user);

        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Internal Server Error');
    }
},

    changePassword: async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.session.user.id; // Get user ID from session

    try {
        // Validate new passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).send("New passwords do not match");
        }

        // Find user in database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).send("Current password is incorrect");
        }
        
        // Hash new password and update user
        user.password = newPassword; // Let pre-save middleware handle hashing
        await user.save();

        res.send("Password updated successfully");
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).send("Internal Server Error");
    }
},
    renderChange: async (req, res) => {
    const sessionUser = req.session.user; // Extract user from session
    if (!sessionUser) {
        return res.redirect("/"); // Redirect to login if not logged in
    }

    res.render('layouts/updatePassword', {
        sessionUser, // Pass the session user to the template
        layout: false,
    });
},


    logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error logging out:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.redirect('/');
    });
  },
};

module.exports = profileController;
