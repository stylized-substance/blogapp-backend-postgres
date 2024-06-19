const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class UserReadingListBlog extends Model {}

UserReadingListBlog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
    read: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'unread',
      validate: {
        isIn: [['read', 'unread']]
      }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "readinglistitem",
  }
);

module.exports = UserReadingListBlog