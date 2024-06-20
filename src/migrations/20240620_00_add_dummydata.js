const { blogs, users } = require("../data/dummydata");
const { Op } = require("sequelize");

const blogsAuthors = blogs.map(blog => blog.author)
const usernames = users.map(user => user.username)

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert("users", users);
    await queryInterface.bulkInsert("blogs", blogs);
  },
  down: async ({ context: queryInterface }) => {
    queryInterface.bulkDelete("blogs", { author: { [Op.in]: blogsAuthors } })
    queryInterface.bulkDelete("users", { username: { [Op.in]: usernames } })
  }
};
