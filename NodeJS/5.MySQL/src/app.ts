const path = require("path");
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const errorController = require("./controllers/error");

const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

db.execute("SELECT * FROM products ")
  .then((result: any) => {
    console.log(result[0], result[1]);
  })
  .catch((err: any) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});
