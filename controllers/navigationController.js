const User = require('../models/User');
const Course = require('../models/Course');

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
    },

    getAllCourses: async (req, res) => {
      try {
        // Extract query parameters for filters
        const { category, price, difficulty } = req.query;
    
        // Create a filter object to pass to the database query
        let filter = {};
    
        // Filter by category if selected
        if (category) {
          filter.category = category;
        }
    
        // Filter by price if selected
        if (price) {
          if (price === 'free') {
            filter.price = { $eq: 0 }; // Assuming 'price' is a numeric value, 0 for free courses
          } else if (price === 'paid') {
            filter.price = { $gt: 0 }; // Filter for paid courses (prices greater than 0)
          }
        }
    
        // Filter by difficulty if selected
        if (difficulty) {
          filter.difficulty = difficulty;
        }
    
        // Fetch courses from the database with the applied filters
        const courses = await Course.find(filter).lean(); // .lean() returns plain JavaScript objects
    
        // Access the session user (if any)
        const sessionUser = req.session.user || null;
    
        // Render the student dashboard with the filtered courses data and session user
        res.render('layouts/search', {
          courses,      // Pass the filtered courses to the view
          sessionUser,  // Pass session user for personalization (if needed)
          layout: false, // Set layout to false if you don't want the default layout
          category,     // Pass the applied category filter to the view
          price,         // Pass the applied price filter to the view
          difficulty     // Pass the applied difficulty filter to the view
        });
      } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Error rendering student dashboard');
      }
    },

    filteredCourses: async (req, res) => {
        // Handle POST requests for search
        try {
            const { query } = req.body; // Get query from form data
            const filter = query ? { title: { $regex: query, $options: 'i' } } : {};

            const courses = await Course.find(filter).lean();
            const sessionUser = req.session.user || null;

            res.render('layouts/search', {
                courses,
                sessionUser,
                layout: false,
                query,
            });
        } catch (error) {
            console.error('Error processing search:', error);
            res.status(500).send('Error processing search');
        }
    },
}


module.exports = navigationController;
