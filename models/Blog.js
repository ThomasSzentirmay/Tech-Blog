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
      type: DataTypes.STRING(10000),
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      get() {
        // Format the date as MM/DD/YYYY
        const date = this.getDataValue('createdAt');
        const formattedDate = date.toLocaleDateString('en-US');
        return formattedDate;
      },
    },
  },
  {
    sequelize: db,
    modelName: 'blog',
  }
);

// Create associations

module.exports = Blog;
