const router = require('express').Router();
const User = require('../models/User')
const Blog = require('../models/Blog')

function isAuthenticated(req, res, next) {
    const isAuthenticated = req.session.user_id;

    if (!isAuthenticated) return res.redirect('/login');

    next();
}


// Add a blog
router.post('/blog', isAuthenticated, async (req, res) => {
    try {
        const { title, comment } = req.body;
        const userId = req.session.user_id;

        const newBlog = await Blog.create({
            title, // Add the title property here
            comment,
            text: comment,
            userId
        });

        res.redirect('/dashboard');
    } catch (err) {
        // Handle error
        console.error(err);
        res.redirect('/dashboard');
    }
});

module.exports = router;