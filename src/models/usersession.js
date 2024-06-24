const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class UserSession extends Model {}

UserSession.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  access_token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  session_valid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user_session'
})

module.exports = UserSession