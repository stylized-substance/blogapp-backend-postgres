const router = require("express").Router();
const { Blog } = require("../models");
const sequelize = require("sequelize");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "blog_count"],
      [sequelize.fn("SUM", sequelize.col("likes")), "total_likes"],
    ],
    group: "author",
    order: [["total_likes", "DESC"]],
  });

  res.json(authors);
});

module.exports = router;
