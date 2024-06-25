const router = require("express").Router();

const { Blog, User } = require("../models");

const tokenExtractor = require("../utils/tokenExtractor");

const sessionFinder = require("../utils/sessionFinder");

const { Op } = require("sequelize");

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
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } },
      ],
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["username"],
    },
    where,
    order: [["likes", "DESC"]],
  });
  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.post("/", tokenExtractor, sessionFinder, async (req, res) => {
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

router.delete(
  "/:id",
  blogFinder,
  tokenExtractor,
  sessionFinder,
  async (req, res) => {
    if (req.blog) {
      if (req.blog.toJSON().user.username === req.decodedToken.username) {
        await req.blog.destroy();
        res.status(200).end();
      } else {
        res
          .status(401)
          .json({ error: "Blogs can only be deleted by their creator" });
      }
    } else {
      res.status(404).end();
    }
  },
);

module.exports = router;
