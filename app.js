const express = require('express');
const session = require('express-session');
const path = require('path');
const hbs = require('express-handlebars');
const fs = require('fs');
const connectToMongoDB = require('./mongodb/mongodb.connect.js'); 
const mainRoutes = require('./routes/mainRoutes.js'); 
const userRoutes = require('./routes/userRoutes.js'); 
const profileRoutes = require('./routes/profileRoutes.js')
const courseRoutes = require('./routes/courseRoutes.js')
const app = express();

// Connect to MongoDB
connectToMongoDB(); // Initialize MongoDB connection

// Set up Handlebars template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: path.join(__dirname, 'views/'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: {
      eq: function (a, b) {
        return a === b;
      }
    }
  })
);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure express-session
app.use(
  session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use `true` if using HTTPS
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Route for the search page
app.get('/search', (req, res) => {
  const query = req.query.query || '';
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(query.toLowerCase())
  );

  res.render('search', { courses: filteredCourses, query });
});

// Use imported routes
app.use(mainRoutes);
app.use(userRoutes); // Add user-specific routes
app.use(profileRoutes);
app.use(courseRoutes);


// Start the server
app.listen(3025, () => {
  console.log('App is started at http://localhost:3025');
});
