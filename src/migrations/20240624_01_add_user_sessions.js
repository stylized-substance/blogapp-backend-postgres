const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({context: queryInterface }) => {
    await queryInterface.createTable('user_sessions', {
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
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: new Date
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('user_sessions')
  }
}
