// const http = require("http");

import express, { Request, Response, NextFunction } from "express";

import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("In the Middleware!");
//   next(); // Allow the request to continue to the middleware in Line.
// });

// app.use("/", (req, res, next) => {
//   console.log("This always run!");
//   next();
// });

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button>Add Product</button></form>'
  );
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1> Hello from Express! </h1>");
});
// const server = http.createServer(app);

app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});
