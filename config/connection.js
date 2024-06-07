const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DB_URL
? new Sequelize(process.env.DB_URL)
: new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

// opens connection to database
// async function connect() {
//   try {
//     await sequelize.authenticate();
//     console.log('Successfully established connection');
//   } catch {
//     console.error('Failed to connect to the database:', error);
//   }
// }

// closes connection to database
// function close() {
//   sequelize.close();
// }

module.exports = { sequelize, connect, close };