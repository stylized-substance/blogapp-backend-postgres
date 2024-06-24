const router = require('express').Router()
const { ReadingListItem } = require('../models')
const tokenExtractor = require("../utils/tokenExtractor");
const sessionFinder = require("../utils/sessionFinder")

router.get('/', async (req, res) => {
  const readingLists = await ReadingListItem.findAll()
  res.json(readingLists)
})


router.post('/', async (req, res) => {
  const addedItem = await ReadingListItem.create(req.body)
  res.json(addedItem)
})

router.put('/:id', tokenExtractor, sessionFinder, async (req, res) => {
  if (!req.session_valid || req.session_valid === false) {
    res.status(401).json(`You don't have a valid login session`)
    return
  }
  
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

  readinglistItem.blogReadStatus = 'read'
  await readinglistItem.save()
  res.json(readinglistItem)
})

module.exports = router