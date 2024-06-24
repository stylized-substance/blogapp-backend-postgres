const Blog = require('./blog')
const User = require('./user')
const ReadingListItem = require('./readinglistitem')
const UserSession = require('./usersession')

User.hasMany(Blog)
Blog.belongsTo(User)
UserSession.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingListItem, as: 'readinglist_items' })
Blog.belongsToMany(User, { through: ReadingListItem, as: 'readinglist_adders' })

module.exports = {
  Blog, User, ReadingListItem, UserSession
}