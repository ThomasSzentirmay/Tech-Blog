const { Model, DataTypes } = require('sequelize');
const db = require('../db/connection');

class Blog extends Model {}

Blog.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize: db,
    modelName: 'blog',
  }
);

module.exports = Blog;
