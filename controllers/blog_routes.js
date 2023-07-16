const router = require('express').Router();
const {User, Blog, Comment} = require('../models')


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
      userId,
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

// Render blog post edit form
router.get('/blogs/:id/edit', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog post by ID
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).send('Blog post not found');
    }

    res.render('edit-blog', { blog });

    console.log('edit page rendered successfully');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
});

// Update a blog post
router.put('/blogs/:id/update', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, comment } = req.body;
    const userId = req.session.user_id;

    const blog = await Blog.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!blog) {
      return res.status(404).send('Blog post not found');
    }

    await blog.update({
      title: title,
      comment: comment,
      text: comment,
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.redirect('/dashboard');
  }
});

// Add a comment to a blog post
router.post('/blogs/:id/comments', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.session.user_id;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).send('Blog post not found');
    }

    // Create the comment
    await Comment.create({
      comment,
      userId,
      blogId: blog.id,
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
