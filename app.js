const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const fs = require('fs');

const app = express();

// Set up Handlebars template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
    defaultLayout: 'home', // Updated to use a 'main' layout
    layoutsDir: path.join(__dirname, 'views/layouts'), // Layouts directory
    partialsDir: path.join(__dirname, 'views/partials'), // Partials directory for reusable components
  })
);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
  // Load courses from JSON
  const coursesFile = path.join(__dirname, 'data', 'courses.json');
  const courses = JSON.parse(fs.readFileSync(coursesFile, 'utf-8'));

  // Render the index page with course data
  res.render('index', { courses });
});

// Start the server
app.listen(3025, () => {
  console.log('App is started at http://localhost:3025');
});
