const router = require("express").Router();

const { Blog, User, ReadingListItem } = require('../models')

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  let where = {}

  if (req.query.read === 'true') {
    where = {blogReadStatus: 'read'}
  }
  
  if (req.query.read === 'false') {
    where = {blogReadStatus: 'unread'}
  }
  
  const user = await User.findByPk(req.params.id, {
    include: [{
      model: Blog,
      as: 'readinglist_items',
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt']
      },
      through: {
        attributes: ['blogReadStatus', 'id'],
        where
      },
    }]
  })
  res.json(user)
})

router.post("/", async (req, res) => {
  console.log(req.body)
  const user = await User.create(req.body);
  res.json(user);
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.username = req.body.username
  }

  await user.save()

  res.json(user)
});

module.exports = router;
