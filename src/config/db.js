//src/config/db.js
const Sequelize = require('sequelize');


const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min:0,
    acquire: 30000,
    idle: 10000
  }
}


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  dbConfig
);

module.exports = sequelize;