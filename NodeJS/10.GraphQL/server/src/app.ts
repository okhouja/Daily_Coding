import * as dotenv from "dotenv";
dotenv.config();
const DB_HOST = process.env.DB_HOST;
const path = require("path");

import express, { Request, Response, NextFunction, application } from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";

import multer from "multer";
import { fileStorage, fileFilter } from "./util/multer";
import {clearImage} from "./util/multer";

import { graphqlHTTP } from "express-graphql";
import graphqlSchema from "./graphql/schema";
import graphqlResolver from "./graphql/resolvers";

import auth from "./middleware/auth";

import cors from "cors";

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join("images")));

// app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(auth);

app.put("/post-image", (req, res, next) => {
  if (!req.isAuth) {
    throw new Error("Not authenticated!");
  }
  if (!req.file) {
    return res.status(200).json({ message: "No file specified!" });
  }
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  return res
    .status(201)
    .json({
      message: "Image saved!",
      filePath: req.file.path.replace(/\\/g, "/"),
    });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "An error occurred.";
      const code = err.originalError.code || 500;
      return {
        message: message,
        // locations: err.locations,
        path: err.path,
        status: code,
        data: data,
        stack: err.stack ? err.stack.split("\n") : [],
      };
    },
  })
);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to our app");
});
mongoose
  .connect(
    DB_HOST as string,
    { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions
  )
  .then(() => console.log("Connected to MongoDB!"))

  .then(() => {
    app.listen(8080, () => {
      console.log("Server is Running on port 8080!");
    });
  })
  .catch((err: Error) => console.log(err));

