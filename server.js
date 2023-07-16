require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const db = require('./db/connection');
const methodOverride = require('method-override');

const view_routes = require('./controllers/view_routes');
const user_routes = require('./controllers/user_routes');
const blog_routes = require('./controllers/blog_routes');

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Load Sessions
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, maxAge: 300000 },
}));

// Setup Handlebars Template Engine
app.engine('hbs', engine({
  layoutsDir: './views/layouts',
  extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './views');

// Load Routes
app.use('/', [view_routes, user_routes, blog_routes]);

// Connect to the db and create all tables based on our models
db.sync({ force: false })
  .then(() => {
    // Start server
    app.listen(PORT, () => console.log('Server started on port %s', PORT));
  });
