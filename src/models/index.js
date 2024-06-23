const Blog = require('./blog')
const User = require('./user')
const ReadingListItem = require('./readinglistitem')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingListItem, as: 'readinglist_items' })
Blog.belongsToMany(User, { through: ReadingListItem, as: 'readinglist_adders' })

module.exports = {
  Blog, User, ReadingListItem
}