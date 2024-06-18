const router = require("express").Router();

const { Blog, User } = require('../models')

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  });
  res.json(users);
});

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
