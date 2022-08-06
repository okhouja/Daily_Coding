// const http = require("http");
const path = require("path");
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   console.log("In the Middleware!");
//   next(); // Allow the request to continue to the middleware in Line.
// });

// app.use("/", (req, res, next) => {
//   console.log("This always run!");
//   next();
// });

// app.use("/", (req, res, next) => {
//   res.send("<h1> Hello from Express! </h1>");
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// const server = http.createServer(app);

app.listen(3000, () => {
  console.log("Server is Running on port 3000!");
});
