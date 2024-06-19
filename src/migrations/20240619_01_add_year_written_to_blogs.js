const { DataTypes } = require("sequelize");

const currentYear = new Date().getFullYear();

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      validate: {
        min: 1991,
        max: currentYear,
      },
    });
  },
  down: async ({ context: queryInterface }) => queryInterface.removeColumn('blogs', 'year')
};
