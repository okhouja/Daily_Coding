import * as dotenv from "dotenv";
dotenv.config();
const DB_HOST = process.env.DB_HOST;

import path from "path";
import https from "https";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import mongoose, { ConnectOptions } from "mongoose";
import session from "express-session";
import helmet from "helmet";
import compression from "compression";
// import morgan from "morgan";
const morgan = require("morgan");
import fs from "fs";

const MongoDBStore = require("connect-mongodb-session")(session);
const errorController = require("./controllers/error");
const csrf = require("csurf");
const flash = require("connect-flash");
import multer from "multer";

import { fileStorage, fileFilter } from "./util/multer";

const User = require("./models/user");

const app = express();

const accessLogStream = fs.createWriteStream(path.join("access.log"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

const store = new MongoDBStore({
  uri: DB_HOST,
  collection: "sessions",
});

const csrfProtection = csrf();

// const privateKey = fs.readFileSync("server.key");
// const certificate = fs.readFileSync("server.cert");

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

app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// app.use(
//   multer({ dest:'../dist/images' }).single("file")
// );

app.use(express.static(path.join(__dirname, "public")));
// app.use( express.static(path.join(__dirname, "images")));
app.use("/dist/upload", express.static(path.join(__dirname, "upload")));
// app.use("/images", express.static("images"));

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
  // res.cookie('XSRF-TOKEN', req.csrfToken());
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
  .connect(
    DB_HOST as string,
    { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions
  )
  .then(() => console.log("Connected to MongoDB!"))

  .then(() => {
    // https
    //   .createServer({ key: privateKey, cert: certificate }, app)
    //   .listen(process.env.PORT || 3000, () => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is Running on port 3000!");
    });
  })
  .catch((err: Error) => console.log(err));
