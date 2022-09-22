import * as dotenv from "dotenv";
dotenv.config();
const DB_HOST = process.env.DB_HOST;

const path = require("path");

import express, { Request, Response, NextFunction } from "express";

import bodyParser from "body-parser";

import mongoose, { ConnectOptions } from "mongoose";

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");
// import * as socketio from "socket.io";
// import * as http from "http";

// import * as io from "socket.io"
// import express from 'express';
// import { createServer } from "http";

import socket from "./socket";

// import { createServer } from "http";
import { Server } from "socket.io";

// import io from './socket'

// const httpServer = createServer();

import multer from "multer";

import { fileStorage, fileFilter } from "./util/multer";

import cors from "cors";

const app = express();
const http = require("http");
const server = http.createServer(app);
// const io = new Server(server);
// const httpServer: http.Server = http.createServer(app);
// const io: socketio.Server = new socketio.Server();
// io.attach(httpServer);

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join("images")));

app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

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
    server.listen(8080, () => {
      console.log("Server is Running on port 8080!");
    });

    // const io = require('socket.io')(server, {
    //   cors: {
    //   origin: "http://localhost:3000",
    //   methods: ["GET", "POST"]
    //  }
    //  });
    socket.connect(server);
    // const server = app.listen(8080);
    // const io = require('socket.io')(server, {
    //     cors: {
    //         origin: "http://localhost:3000",
    //         methods: ["GET", "POST"]
    //     }
    // });
   

    // const io = require("./socket").init(server)
    // const init = require("./socket");

    // init(server);

    // const io = new Server(server, {
    //   cors: {
    //     origin: "http://localhost:3000",
    //     allowedHeaders: ["my-custom-header"],
    //     credentials: true,
    //   },
    // });
    // io.init(server)

    // const Socket = new SocketServer(server)
    // const connection = socket.connection();
    // if (connection) {
    //   connection.emit("connection", (msg: any) => {
    //     console.log("Client connection established");
    //   });
    // }

    // io.on("connection", (socket) => {
    //   console.log("Client connected to server");
    //   socket.emit("status", "connected");
    //   socket.on("disconnect", () => {
    //     console.log("Client disconnected");
    //   });
    // });
  })
  .catch((err: Error) => console.log(err));
