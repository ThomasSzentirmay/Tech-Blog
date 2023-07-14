require('dotenv').config();
const express = require('express');
// Import handlebars
const { engine } = require('express-handlebars');
// Import express session
const session = require('express-session');
// Import our db connection
const db = require('./db/connection');

// Import routes
const view_routes = require('./controllers/view_routes');
const user_routes = require('./controllers/user_routes');
const thought_routes = require('./controllers/thought_routes');

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Setup Handlebars Template Engine
app.engine('hbs', engine({
    layoutsDir: './views/layouts',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

// Load Sessions
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 300000 }
}));

// Load Routes
app.use('/', [view_routes, user_routes, blog_routes]);



// Connect to the db and create all tables based off of our models
db.sync({ force: false })
    .then(() => {
        // Start server
        app.listen(PORT, () => console.log('Server started on port %s', PORT));
    });