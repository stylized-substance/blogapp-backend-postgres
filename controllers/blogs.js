const router = require('express').Router()
const errorHandler = require('../utils/errorHandler')

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  console.log('here')
  const blogs = await Blog.findAll()
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    console.log(req.blog.toJSON())
    res.json(req.blog)
  } else {
    res.status(404).end()
  };
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const blog = await Blog.create(req.body)
  res.json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = (req.body.likes)
    await req.blog.save()
    res.json({ likes: req.blog.likes })
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
    res.status(200).end()
  } else {
    res.status(404).end()
  }
})

module.exports = router