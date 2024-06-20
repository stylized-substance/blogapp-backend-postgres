const router = require('express').Router()
const { ReadingListItem } = require('../models')

router.post('/', async (req, res) => {
  const addedItem = ReadingListItem.create(req.body)
  res.json(addedItem)
})

module.exports = router