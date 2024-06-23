const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class ReadingListItem extends Model {}

ReadingListItem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' }
  },
  blogReadStatus: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'unread'
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user_readinglist'
})

module.exports = ReadingListItem