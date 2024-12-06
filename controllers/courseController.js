const courses = require('../data/courses'); // Assuming courses are stored in a data file or database

const getFilteredCourses = (req, res) => {
  const { category, price, difficulty } = req.query;
  let filteredCourses = courses;

  // Filter by category
  if (category) {
    filteredCourses = filteredCourses.filter(course => course.category === category);
  }

  // Filter by price
  if (price) {
    if (price === 'free') {
      filteredCourses = filteredCourses.filter(course => course.price === "Free");
    } else if (price === 'paid') {
      filteredCourses = filteredCourses.filter(course => course.price > 0);
    }
  }

  // Filter by difficulty
  if (difficulty) {
    filteredCourses = filteredCourses.filter(course => course.difficulty === difficulty);
  }

  // Render the view with filtered courses and query parameters
  res.render('layouts/home', { courses: filteredCourses, category, price, difficulty });
};

module.exports = { getFilteredCourses };
