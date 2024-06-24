const router = require('express').Router()
const { ReadingListItem } = require('../models')
const tokenExtractor = require("../utils/tokenExtractor");

router.get('/', async (req, res) => {
  const readingLists = await ReadingListItem.findAll()
  res.json(readingLists)
})


router.post('/', async (req, res) => {
  const addedItem = await ReadingListItem.create(req.body)
  res.json(addedItem)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readinglistItem = await ReadingListItem.findByPk(req.params.id)

  if (!readinglistItem) {
    res.status(404).json('No reading list found')
    return
  }

  if (!(readinglistItem.userId === req.decodedToken.id)) {
    res.status(400).json('error: Reading list items can only be updated by their owner')
    return
  }

  if (!req.body.read) {
    res.status(400).json('error: Missing read property from request body')
    return
  }
  
  if (!(req.body.read === true)) {
    res.status(400).json('error: Request body read property can only be true')
    return
  }

  readinglistItem.blogReadStatus = req.body.read
  await readinglistItem.save()
  res.json(readinglistItem)
})

module.exports = router