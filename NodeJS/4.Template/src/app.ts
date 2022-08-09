import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();

const users: any = [];

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.render("index", { pageTitle: "Add User" });
});

app.get("/users", (req, res, next) => {
  res.render("users", { pageTitle: "Users", users: users });
});

app.post("/add-user", (req, res, next) => {
  users.push({ name: req.body.username });
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});
