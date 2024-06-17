const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.get('/api/blogs/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    console.log(req.blog.toJSON())
    res.json(req.blog)
  } else {
    res.status(404).end()
  };
})

router.post('/api/blogs', async (req, res) => {
  try {
    console.log(req.body)
    const blog = Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.put('/api/blogs/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    // some operation here
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/api/blogs/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    try {
      await req.blog.destroy()
      res.status(200).end()
    } catch (error) {
      return res.status(400).json({ error })
    }
  } else {
    res.status(404).end()
  }
})

module.exports = router