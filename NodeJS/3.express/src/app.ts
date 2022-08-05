// const http = require("http");

import express, { Request, Response, NextFunction } from "express";

const app = express();

// app.use((req, res, next) => {
//   console.log("In the Middleware!");
//   next(); // Allow the request to continue to the middleware in Line.
// });

app.use("/", (req, res, next) => {
  console.log("This always run!");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("In Add Product!");
  res.send('<h1> The "Add Product" Page! </h1>');
});

app.use("/", (req, res, next) => {
  console.log("In anther middleware!");
  res.send("<h1> Hello from Express! </h1>");
});
// const server = http.createServer(app);

app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});
