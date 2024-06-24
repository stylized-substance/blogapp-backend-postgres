const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN
    })
  },
  down: async ({ context: queryInterface }) => queryInterface.removeColumn('users', 'disabled')
}