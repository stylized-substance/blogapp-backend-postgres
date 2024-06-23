const router = require('express').Router()
const { ReadingListItem } = require('../models')

router.post('/', async (req, res) => {
  const addedItem = await ReadingListItem.create(req.body)
  console.log(addedItem)
  res.json(addedItem)
})

module.exports = router