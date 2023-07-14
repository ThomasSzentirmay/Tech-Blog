const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_app_example', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;