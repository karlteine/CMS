const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const fs = require('fs');

const app = express();

// Import routes
const mainRoutes = require('./routes/mainRoutes.js');

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

// Load courses data from a JSON file
let courses = [];

fs.readFile(path.join(__dirname, 'data', 'courses.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading courses file:', err);
      return;
    }
    courses = JSON.parse(data);
  });


// Route for the home page
app.get('/', (req, res) => {
    const category = req.query.category;
    const price = req.query.price;
    const difficulty = req.query.difficulty;
  
    let filteredCourses = courses;
  
    if (category) {
      filteredCourses = filteredCourses.filter(course => course.category === category);
    }
  
    if (price) {
      if (price === 'free') {
        filteredCourses = filteredCourses.filter(course => course.price === "Free");
      } else if (price === 'paid') {
        filteredCourses = filteredCourses.filter(course => course.price > 0);
      }
    }
  
    if (difficulty) {
      filteredCourses = filteredCourses.filter(course => course.difficulty === difficulty);
    }
  
    // Render the page with the filtered courses and selected filter values
    res.render('index', { 
      courses: filteredCourses, 
      category, 
      price, 
      difficulty 
    });
  });
// Use the imported routes
app.use(mainRoutes);


  // Route for the search page
app.get('/search', (req, res) => {
    const query = req.query.query || '';  // Default to empty string if no query is provided
  
    // Filter courses by name (case insensitive)
    const filteredCourses = courses.filter(course => {
      return course.title.toLowerCase().includes(query.toLowerCase());
    });
  
    res.render('search', { 
      courses: filteredCourses, 
      query: query  // Pass the query back to the view so the search bar is pre-filled
    });
  });
  
  
// Start the server
app.listen(3025, () => {
  console.log('App is started at http://localhost:3025');
});
