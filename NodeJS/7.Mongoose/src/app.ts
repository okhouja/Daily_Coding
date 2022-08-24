import * as dotenv from "dotenv";
dotenv.config();

const path = require("path");
import express, { RequestHandler } from "express";
import bodyParser from "body-parser";
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

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

app.use((req, res, next) => {
  User.findById("63052e4e53d7cb4a02db9e48")
    .then((user: any) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err: Error) => console.log(err));
});

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server is Running on port 3000!");
  });
});
