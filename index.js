const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const loginRoutes = require("./routes/login-signup");

const calculatorRoutes = require("./routes/calculator");

const sequelize = require("./utils/database");

const User = require("./models/user");

const Calculator = require("./models/calculator");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/user", loginRoutes);

app.use("/calculator", calculatorRoutes);

User.hasMany(Calculator, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Calculator.belongsTo(User, {
  foreignKey: "userId",
});
sequelize.sync().then(() => {
  app.listen(3000);
});
