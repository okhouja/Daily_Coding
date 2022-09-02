import * as dotenv from "dotenv";
dotenv.config();
const DB_HOST = process.env.DB_HOST;

const path = require("path");
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const mongoose = require("mongoose");
// const session = require("express-session");
import session from "express-session";

const MongoDBStore = require("connect-mongodb-session")(session);
const errorController = require("./controllers/error");
const csrf = require("csurf");
const flash = require("connect-flash");
import multer from "multer";

import { fileStorage, fileFilter } from "./util/multer";

const User = require("./models/user");

const app = express();

const store = new MongoDBStore({
  uri: DB_HOST,
  collection: "sessions",
});

const csrfProtection = csrf();

// app.use(upload)

// app.use(express.json());

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  // multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use(
  multer({ dest:'../dist/images' }).single("file")
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user: any) => {
      // throw new Error('Dummy')
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err: any) => {
      next(new Error(err));
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// app.get("/500", errorController.get500);
app.use(errorController.get404);
app.use(errorController.get500);

// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).render("500", {
//     pageTitle: "Error!",
//     path: "/500",
//     isAuthenticated: req.session.isLoggedIn,
//   });
// });

mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB!"))

  .then(() => {
    app.listen(3000, () => {
      console.log("Server is Running on port 3000!");
    });
  })
  .catch((err: Error) => console.log(err));
