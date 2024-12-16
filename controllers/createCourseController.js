const Course = require("../models/Course");

const createCourseController = {
  getForm: async(req, res) => {
   // Ensure the user is logged in
   if (!req.session.user) {
    return res.redirect('/'); // Redirect to login page if not logged in
  }

  // Retrieve session user details
  const sessionUser = req.session.user;

  res.render('layouts/course-creation', {
    sessionUser, // Pass session user to the template
    layout: false, // Optional: skip default layout
  });
  },
  createCourse: async (req, res) => {
    const { title, description, videoUrl, thumbnailUrl, language, category, price, difficulty } = req.body;

    try {
      // Validate input (optional, can add more validation here)
      if (!title || !description || !videoUrl || !thumbnailUrl || !language || !category || !price || !difficulty) {
        return res.status(400).send("All fields are required");
      }

      // Create a new course
      const newCourse = new Course({
        title,
        description,
        videoUrl,
        thumbnailUrl,
        language,
        category,
        price,
        difficulty,
        instructor: req.session.user.id, // Assuming the logged-in user is the instructor
      });

      await newCourse.save();

      // Redirect to the instructor's dashboard or another relevant page
      res.redirect("/instructor/dashboard");
    } catch (err) {
      console.error("Error creating course:", err);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = createCourseController;
