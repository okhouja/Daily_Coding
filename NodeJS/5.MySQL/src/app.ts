const path = require("path");
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const errorController = require("./controllers/error");

const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then((result: any) => {
    console.log(result);
    app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});

  })
  .catch((err: Error) => {
    console.log(err);
  });

