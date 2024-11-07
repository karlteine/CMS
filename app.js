const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

// Set up Handlebars template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + '/views/',
}));

// Serve static files from the public directory
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
    res.render('index'); // Renders index.hbs
});

// Start the server
app.listen(3025, () => {
    console.log('App is started at http://localhost:3025');
});
