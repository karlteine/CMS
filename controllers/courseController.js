const courses = require('../data/courses'); // Assuming courses are stored in a data file or database
const User = require('../models/User');

const getFilteredCourses = async (req, res) => {
  const { category, price, difficulty } = req.query;
  let filteredCourses = courses;

  // Filter by category
  if (category) {
    filteredCourses = filteredCourses.filter(course => course.category === category);
  }

  // Filter by price
  if (price) {
    filteredCourses = filteredCourses.filter(course =>
      price === 'free' ? course.price === 'Free' : course.price > 0
    );
  }

  // Filter by difficulty
  if (difficulty) {
    filteredCourses = filteredCourses.filter(course => course.difficulty === difficulty);
  }

  try {
    // Access the session user
    const sessionUser = req.session.user || null;

    // Render the home layout
    res.render('layouts/home', {
      courses: filteredCourses,
      sessionUser,    // Pass session user to the view
      category,
      price,
      difficulty,
      layout: false
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


// Controller function to view a course
const viewCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor');
    if (!course) {
      return res.status(404).send('Course not found');
    }
    res.render('courseView', { course });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading course');
  }
};

module.exports = { getFilteredCourses, viewCourse };
