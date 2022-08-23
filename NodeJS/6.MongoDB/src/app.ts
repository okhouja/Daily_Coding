import * as dotenv from "dotenv";
dotenv.config();

const path = require("path");
import express, { RequestHandler } from "express";
import bodyParser from "body-parser";

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database");

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

app.use((req, res, next) => {});

mongoConnect((client: any) => {
  // console.log(client);
  app.listen(3000, () => {
    console.log("Server is Running on port 3000!");
  });
});
