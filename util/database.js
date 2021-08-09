// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   { dialect: "mysql", host: process.env.DB_HOST },
// );

// module.exports = sequelize;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "bnk_homes",
  "root",
  "Eromosele2121991@",
  { dialect: "mysql", host: "localhost" }
);

module.exports = sequelize;
