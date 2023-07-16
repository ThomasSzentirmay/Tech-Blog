const { Model, DataTypes } = require('sequelize');
const db = require('../db/connection');

class Comment extends Model {}

Comment.init(
  {
    comment: {
      type: DataTypes.STRING,
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
        const date = this.getDataValue('createdAt');
        const formattedDate = date.toLocaleDateString('en-US');
        return formattedDate;
      },
    },
  },
  {
    sequelize: db,
    modelName: 'comment',
  }
);

// Create associations

module.exports = Comment;
