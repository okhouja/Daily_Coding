import * as dotenv from "dotenv";
dotenv.config();
const DB_HOST = process.env.DB_HOST;

const path = require("path");

import express, { Request, Response, NextFunction } from "express";

import bodyParser from "body-parser";

import mongoose, { ConnectOptions } from "mongoose";

const feedRoutes = require("./routes/feed");

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

app.listen(8080, () => {
  console.log("Server is Running on port 3000!");
});

mongoose
  .connect(
    DB_HOST as string,
    { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions
  )
  .then(() => console.log("Connected to MongoDB!"))

  .then(() => {
    app.listen(4000, () => {
      console.log("Server is Running on port 3000!");
    });
  })
  .catch((err: Error) => console.log(err));
