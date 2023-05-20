const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Calculator = sequelize.define("calculator", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  calculation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  result: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Calculator;
