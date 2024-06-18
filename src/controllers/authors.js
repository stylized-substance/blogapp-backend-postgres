const router = require('express').Router()
const { Blog } = require('../models')
const sequelize = require('sequelize')

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    //TODO: fix query
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('author')), 'blog_count'],
      [sequelize.fn('COUNT', sequelize.col('likes')), 'total_likes']
    ],
    group: 'author'
  })

  res.json(authors)
})

module.exports = router