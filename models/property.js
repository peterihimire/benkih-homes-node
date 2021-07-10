const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Property = sequelize.define("property", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  creator: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latitude: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bedroom: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bathroom: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  propertyCity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  propertyState: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  featured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  recent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  newProperty: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});
module.exports = Property;
