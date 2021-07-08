const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "bnk-homes",
  "root",
  "Eromosele2121991@",
  { dialect: "mysql", host: "localhost" }
);

module.exports = sequelize;