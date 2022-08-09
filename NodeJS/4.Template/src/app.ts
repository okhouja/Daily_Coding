import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
const path = require("path");

const expressHbs: any = require("express-handlebars");

const app = express();

const users: any = [];

app.engine(
  "hbs",
  expressHbs.engine({ extname: "hbs", defaultLayout: "main-layout" })
);
// app.set("view engine", "pug");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.render("index", { pageTitle: "Add User" });
});

app.get("/users", (req, res, next) => {
  res.render("users", {
    pageTitle: "Users",
    users: users,
    hasUsers: users.length > 0,
  });
});

app.post("/add-user", (req, res, next) => {
  users.push({ name: req.body.username });
  res.redirect("/users");
});

app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});
