const User = require('../models/User');


const navigationController = {
    getUser: (req, res) => {
    // Ensure the user is logged in
    if (!req.session.user) {
      return res.redirect('/'); // Redirect to login page if not logged in
    }

    // Retrieve session user details
    const sessionUser = req.session.user;

    res.render('layouts/contact', {
      sessionUser, // Pass session user to the template
      layout: false, // Optional: skip default layout
    });
    }
}


module.exports = navigationController;
