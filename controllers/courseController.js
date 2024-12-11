const Course = require('../models/Course'); // Mongoose model for courses
const User = require('../models/User');


const getAllCourses = async (req, res) => {
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
    res.render('layouts/home', {
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
};

// Controller function to view a course
const viewCourse = async (req, res) => {
 
  try {
    // Find the course by its ID in the Course collection
    const course = await Course.findById(req.params.id).lean();
    console.log(course);  // Logs the course ID for debugging
    // Check if the course was found
    if (!course) {
      return res.status(404).send('Course not found');  // Return 404 if the course doesn't exist
    }

    // Fetch the instructor using the instructor's ObjectId from the course
    const instructor = await User.findById(course.instructor).lean();

    // Check if the instructor was found
    if (!instructor) {
      return res.status(404).send('Instructor not found');  // Return 404 if the instructor doesn't exist
    }

    // Render the course view template and pass the course and instructor data to the view
    res.render('layouts/courseView', { course, instructor, layout: false });
  } catch (error) {
    // If there's an error, log it and send a 500 error response
    console.error(error);
    res.status(500).send('Error loading course');
  }
};



module.exports = { viewCourse, getAllCourses };
