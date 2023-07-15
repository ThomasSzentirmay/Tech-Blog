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

router.put('/:id/update', isAuthenticated, async (req, res) => {
    try {
        const { title, comment } = req.body;
        const { id } = req.params;
  
      console.log('Received update request for blog id:', id);
  
      // Find the blog post by ID
      const blog = await Blog.findByPk(id);
  
      console.log('Found blog:', blog);
  
      if (!blog) {
        console.log('Blog post not found');
        return res.status(404).send('Blog post not found');
      }
  
      // Update the blog post
      console.log('Updating blog post:', blog.title);
  
      await blog.update({
        title: title,
        comment: comment
      });
  
      console.log('Blog post updated successfully:', blog.title);
  
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.redirect('/dashboard');
    }
  });
  
  

module.exports = router;

