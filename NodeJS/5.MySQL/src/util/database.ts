import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize("node-complete", "root", "N0de12345", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
