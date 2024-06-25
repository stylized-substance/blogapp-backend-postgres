const router = require("express").Router();
const { ReadingListItem } = require("../models");
const tokenExtractor = require("../utils/tokenExtractor");
const sessionFinder = require("../utils/sessionFinder");

router.get("/", async (req, res) => {
  const readingLists = await ReadingListItem.findAll();
  res.json(readingLists);
});

router.post("/", async (req, res) => {
  const addedItem = await ReadingListItem.create(req.body);
  res.json(addedItem);
});

router.put("/:id", tokenExtractor, sessionFinder, async (req, res) => {
  const readinglistItem = await ReadingListItem.findByPk(req.params.id);

  if (!readinglistItem) {
    res.status(404).json("No reading list found");
    return;
  }

  if (!(readinglistItem.userId === req.decodedToken.id)) {
    res
      .status(400)
      .json("error: Reading list items can only be updated by their owner");
    return;
  }

  if (typeof req.body.read === "undefined") {
    res.status(400).json("error: Missing read property from request body");
    return;
  }

  if (req.body.read !== true && req.body.read !== false) {
    res
      .status(400)
      .json("error: Request body read property can only be true or false");
    return;
  }

  readinglistItem.blogReadStatus = req.body.read;
  await readinglistItem.save();
  res.json(readinglistItem);
});

module.exports = router;
