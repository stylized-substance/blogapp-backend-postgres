const router = require('express').Router()
const { UserReadingListBlog } = require('../models')

router.post('/', async (req, res) => {
  console.log(req.body)
  // Example req.body
  // {
  //   "blogId": 10,
  //   "userId": 3
  // }
  // const addedBlog = await UserReadingListBlog.create({
  //   blog_id: req.body.blogId,
  //   user_id: req.body.userId
  // })
  const addedBlog = await UserReadingListBlog.create(req.body)
  res.json(addedBlog)

})

module.exports = router