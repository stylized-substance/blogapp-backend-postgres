const router = require("express").Router();

const { Blog, User } = require("../models");

const tokenExtractor = require("../utils/tokenExtractor");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, {
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["username"],
    },
  });
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["username"],
    },
  });
  console.log(JSON.stringify(blogs, null, 2));
  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    console.log(req.blog.toJSON());
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    date: new Date(),
  });
  res.json(blog);
});

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json({ likes: req.blog.likes });
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
  if (req.blog) {
    if (req.blog.toJSON().user.username === req.decodedToken.username) {
      await req.blog.destroy()
      res.status(200).end();
    } else {
      res.status(401).json({ error: 'Blogs can only be deleted by their creator' })
    }
  } else {
    res.status(404).end();
  }
});

module.exports = router;
