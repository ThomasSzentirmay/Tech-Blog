const { Sequelize } = require('sequelize');
const isProduction = process.env.PORT;
let connection;

if (isProduction) {
  connection = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql'
  })
} else {
  connection = new Sequelize('tech_blog_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
}

module.exports = connection;