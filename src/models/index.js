const Blog = require('./blog')
const User = require('./user')
const UserReadingListBlog = require('./user_readinglist_blog')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany( Blog, { through: UserReadingListBlog, as: 'blogs_added_to_readinglist'})
Blog.belongsToMany( User, { through: UserReadingListBlog, as: 'added_to_readinglist_by'})


module.exports = {
  Blog, User, UserReadingListBlog
}