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
            title,
            comment,
            text: comment,
            userId
        });

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
});

// Delete a blog
router.delete('/blogs/:id', isAuthenticated, async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.session.user_id;

        const blog = await Blog.findOne({
            where: {
                id: blogId,
                userId: userId,
            },
        });

        if (!blog) {
            return res.sendStatus(404);
        }

        await blog.destroy();

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Update a blog post (GET)
router.get('/blogs/:id/edit', isAuthenticated, async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);

        if (!blog) {
            // Handle case where blog post is not found
            return res.redirect('/dashboard');
        }

        res.render('edit-blog', { blog });
    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
});

// Update a blog post
router.put('/blogs/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text } = req.body;

        // Find the blog post by ID
        const blog = await Blog.findByPk(id);

        if (!blog) {
            return res.status(404).send('Blog post not found');
        }

        // Update the blog post
        blog.title = title;
        blog.text = text;
        await blog.save();

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
});

module.exports = router;

