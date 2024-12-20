const Course = require('../models/Course'); // Mongoose model for courses
const User = require('../models/User');


const getAllCourses = async (req, res) => {
  try {
    // Extract query parameters for filters
    const { category, price, difficulty, language } = req.query;

    // Fetch the current user's document from the database
    const userId = req.session.user.id; // Assuming the session stores the user's ID
    if (!userId) {
      return res.status(401).send('Unauthorized access'); // Handle unauthorized access
    }

    const user = await User.findById(userId).lean(); // Replace `User` with your user model
    if (!user || !user.registered_courses) {
      return res.status(404).send('User or registered courses not found');
    }

    // Extract the course IDs from the user's registered courses
    const registeredCourseIds = user.registered_courses.map(course => course.course_id);

    // Create a filter object to pass to the database query
    let filter = { _id: { $in: registeredCourseIds } }; // Filter only registered courses

    // Add additional filters
    if (category) {
      filter.category = category;
    }
    if (language) {
      filter.language = language;
    }
    if (price) {
      if (price === 'free') {
        filter.price = { $eq: 0 }; // Free courses
      } else if (price === 'paid') {
        filter.price = { $gt: 0 }; // Paid courses
      }
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    // Fetch courses from the database with the applied filters
    const courses = await Course.find(filter).lean(); // Replace `Course` with your course model

    // Access the session user
    const sessionUser = req.session.user || null;

    // Render the student dashboard with the filtered courses data and session user
    res.render('layouts/home', {
      courses,      // Pass the filtered courses to the view
      sessionUser,  // Pass session user for personalization (if needed)
      layout: false, // Set layout to false if you don't want the default layout
      category,     // Pass the applied category filter to the view
      price,         // Pass the applied price filter to the view
      difficulty,   // Pass the applied difficulty filter to the view
      language     // Pass the applied language filter to the view
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
    if (!course) {
      return res.status(404).send('Course not found'); // Return 404 if the course doesn't exist
    }

    // Fetch the instructor using the instructor's ObjectId from the course
    const instructor = await User.findById(course.instructor).lean();
    if (!instructor) {
      return res.status(404).send('Instructor not found'); // Return 404 if the instructor doesn't exist
    }

    // Check if the user is logged in
    if (!req.session.user) {
      return res.redirect('/login'); // Redirect to login if the user is not logged in
    }

    // Fetch the logged-in user from the session
    const sessionUser = await User.findById(req.session.user.id).lean();
    if (!sessionUser) {
      return res.status(401).send('CourseView>User not found'); // Handle case where session is invalid
    }

    // Check if the user is already enrolled in the course
    const isEnrolled = sessionUser.registered_courses.some(
      (registered) => registered.course_id.toString() === course._id.toString()
    );

    if (isEnrolled) {
      // Render a different page for enrolled users (e.g., course content page)
      return res.render('layouts/courseView', { 
        course, 
        instructor, 
        sessionUser, 
        layout: false 
      });
    }

    // If the user is not enrolled, render the course view page
    res.render('layouts/enrollView', { 
      course, 
      instructor, 
      sessionUser, 
      layout: false 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading course');
  }
};


const enrollCourse = async (req, res) => {
  try {
    // Retrieve logged-in user from session
    const userId = req.session.user.id; // Ensure you're accessing `_id` for MongoDB ObjectId
    const courseId = req.params.id;

    // Check if the course exists
    const course = await Course.findById(courseId).lean();
    if (!course) {
      return res.status(404).send('Course not found');
    }

    // Fetch the instructor for the course
    const instructor = await User.findById(course.instructor).lean();
    if (!instructor) {
      return res.status(404).send('Instructor not found');
    }

    // Fetch the user and check enrollment
    const sessionUser = await User.findById(userId);
    if (!sessionUser) {
      return res.status(401).send('User not found');
    }

    const isAlreadyEnrolled = sessionUser.registered_courses.some(
      (registered) => registered.course_id.toString() === courseId
    );


    // Add the course to the user's registered courses
    sessionUser.registered_courses.push({ course_id: courseId, registration_date: new Date() });
    await sessionUser.save();

    // Update session data to reflect the new enrollment
    req.session.user.registered_courses = sessionUser.registered_courses;
    console.log('Enroll course: ');
    // Render course page after successful enrollment
    return res.render('layouts/courseView', {
      course,
      instructor,
      sessionUser: {
        ...sessionUser.toObject(), // Convert Mongoose document to plain object
        role: sessionUser.role,   // Ensure 'role' is explicitly included
      },
      layout: false,
    });
  } catch (error) {
    console.error('Enrollment Error:', error);
    res.status(500).send('Server Error');
  }
};



module.exports = { viewCourse, getAllCourses, enrollCourse };
