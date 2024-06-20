const Blog = require('./blog')
const User = require('./user')
const ReadingListItem = require('./readinglistitem')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingListItem, as: 'readinglist_added' })
Blog.belongsToMany(User, { through: ReadingListItem, as: 'users_added_to_readinglist' })

module.exports = {
  Blog, User, ReadingListItem
}