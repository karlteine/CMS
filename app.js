const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const fs = require('fs');
const connectToMongoDB = require('./mongodb/mongodb.connect.js'); // MongoDB connection
const mainRoutes = require('./routes/mainRoutes.js'); // Main routes
const userRoutes = require('./routes/userRoutes.js'); // User routes

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
  })
);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load courses data from a JSON file
let courses = [];
fs.readFile(path.join(__dirname, 'data', 'courses.json'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading courses file:', err);
    return;
  }
  courses = JSON.parse(data);
});



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

// Start the server
app.listen(3025, () => {
  console.log('App is started at http://localhost:3025');
});
