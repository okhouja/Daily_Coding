const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "N0de12345", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize
