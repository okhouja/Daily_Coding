import * as dotenv from "dotenv";
dotenv.config();
const DB_HOST = process.env.DB_HOST;

const path = require("path");
import express, { RequestHandler } from "express";
import bodyParser from "body-parser";
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
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
  User.findById("6307186716c4b235b430b459")
    .then((user: any) => {
      req.user = user;
      next();
    })
    .catch((err: Error) => console.log(err));
});

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Connected to MongoDB!"))
  .then((result: any) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Omar",
          email: "omar@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
  })

  .then(() => {
    app.listen(3000, () => {
      console.log("Server is Running on port 3000!");
    });
  })
  .catch((err: Error) => console.log(err));
