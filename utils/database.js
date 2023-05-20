const Sequelize = require("sequelize");

const sequelize = new Sequelize("calculator", "root", "rootuser", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
