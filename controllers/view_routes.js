const router = require('express').Router();
const User = require('../models/User');
const Blog = require('../models/Blog')

function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect('/login');

  next();
}

// Show Homepage
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: User,
    });

    res.render('index', {
      isHome: true,
      isLoggedIn: req.session.user_id,
      blogs: blogs.map(blog => blog.get({ plain: true })),
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Show Login Page
router.get('/login', (req, res) => {
  if (req.session.user_id) return res.redirect('/dashboard')

  return res.render('login', {
    isLogin: true
  });
});

// Show Register Page
router.get('/register', (req, res) => {
  if (req.session.user_id) return res.redirect('/dashboard')

  res.render('register', {
    isRegister: true
  });
});

// Show Dashboard Page
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      include: Blog,
    });

    res.render('dashboard', {
      userName: user.userName,
      blogs: user.blogs.map(blog => blog.get({ plain: true })),
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});
module.exports = router;