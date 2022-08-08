const path = require("path");
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const expressHbs: any = require("express-handlebars");

const app = express();

// app.set("view engine", "pug");

app.engine("hbs", expressHbs.engine({ extname: '.hbs', defaultLayout: ""}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found !" });
});

app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});
