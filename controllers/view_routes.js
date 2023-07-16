const router = require('express').Router();
const { User, Blog, Comment } = require("../models");

function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect('/login');

  next();
}

// Show Homepage
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [User, 
        {
          model: Comment,
          include: User
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const plainBlog = blogs.map(blog => blog.get({ plain: true }));
    console.log(plainBlog[0].comments)

    res.render('index', {
      isHome: true,
      isLoggedIn: req.session.user_id,
      blogs: plainBlog,
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
      include: {
        model: Blog,
        include: User
      },
      order: [[Blog, 'createdAt', 'DESC']]
    });

    const plainObj = user.blogs.map(blog => blog.get({ plain: true }))

    console.log(plainObj)

    res.render('dashboard', {
      userName: user.userName,
      blogs: plainObj,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});
module.exports = router;