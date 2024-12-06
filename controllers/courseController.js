const courses = require('../data/courses'); // Assuming courses are stored in a data file or database
const User = require('../models/User');

const getFilteredCourses = async (req, res) => {
    const { category, price, difficulty } = req.query;
    let filteredCourses = courses;
  
    // Filter by category, price, difficulty as in your logic
    if (category) {
      filteredCourses = filteredCourses.filter(course => course.category === category);
    }
    if (price) {
      filteredCourses = filteredCourses.filter(course => price === 'free' ? course.price === 'Free' : course.price > 0);
    }
    if (difficulty) {
      filteredCourses = filteredCourses.filter(course => course.difficulty === difficulty);
    }
  
    // Fetch users from database and convert to plain objects
    try {
      const users = await User.find().lean();  // .lean() converts documents to plain objects
      res.render('layouts/home', {
        courses: filteredCourses,
        users,  // Passing plain users to the template
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
  

module.exports = { getFilteredCourses  };
