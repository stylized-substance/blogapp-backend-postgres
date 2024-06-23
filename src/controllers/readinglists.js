const router = require('express').Router()
const { ReadingListItem } = require('../models')

router.get('/', async (req, res) => {
  const readingLists = await ReadingListItem.findAll()
  res.json(readingLists)
})


router.post('/', async (req, res) => {
  const addedItem = await ReadingListItem.create(req.body)
  res.json(addedItem)
})

module.exports = router