// import { RequestHandler } from "express";

// import User from "./models/user.model";
// // const user: any = await User.findById(userId);

// const username: RequestHandler = async (req, res, next) => {
//   const user = await User.findById(req.userId);
//   console.log(user);
  
//   return user;
// };

let connection: any = null;

export class Socket {
  socket: any;

  constructor() {
    this.socket = null;
  }
  connect(server: any) {
    const io = require("socket.io")(server, {
      allowEIO4: true,
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    // io.use(async (socket, next) => {
    //   try {
    //     const user = await User.findOne( username );
    //     socket.user = user;
    //   } catch (err) {
    //     next(new Error("unknown user"));
    //   }
    // });
    io.on("connection", (socket: any) => {
      this.socket = socket;
      console.log("Client connected to server", socket.connected);

      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.false);
      });
    });
  }
  emit(event: any, data: any) {
    this.socket.emit(event, data);
  }
  static init(server: any) {
    if (!connection) {
      connection = new Socket();
      connection.connect(server);
    }
  }
  static getConnection() {
    if (connection) {
      return connection;
    }
  }
}
export default {
  connect: Socket.init,
  connection: Socket.getConnection,
};

// *******
// const { Server } = require("socket.io");

// let io;

// export default {
//   init: (httpServer) => {
//     io = new Server(httpServer, {
//       cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type, Authorization"],
//         credentials: true,
//       },
//     });
//     return io;
//   },
//   getIO: () => {
//     if (io) {
//       return io;
//     }
//     // else {
//     //   throw new Error("Socket.io not initialized");
//     // }
//   },
// };

// *******

/*
let io;
import { createServer } from "http";

import { Server } from "socket.io";

const SocketServer = {
  init: (httpServer) => {
   const io = new Server(httpServer, {
        cors: {
          origin: "http://localhost:3000",
          allowedHeaders: ["my-custom-header"],
          credentials: true,
        },
      });
    // io = require("socket.io")(httpServer, {
    //     origin: 'http://localhost:3000',
    //     methods: ['GET', 'POST'],
    //     credentials: true,
    // });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};

export default SocketServer;


// // // import { Server } from 'socket.io';

// // // const WEBSOCKET_CORS = {
// // //    origin: "*",
// // //    methods: ["GET", "POST"]
// // // }

// // // class Websocket extends Server {

// // //    private static io: Websocket;

// // //    constructor(httpServer) {
// // //        super(httpServer, {
// // //            cors: WEBSOCKET_CORS
// // //        });
// // //    }

// // //    public static getInstance(httpServer?): Websocket {

// // //        if (!Websocket.io) {
// // //            Websocket.io = new Websocket(httpServer);
// // //        }

// // //        return Websocket.io;

// // //    }
// // // }

// // // export default Websocket;

// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer();
// // const io = new Server(httpServer, {
// //   cors: {
// //     origin: "http://localhost:3000/",
// //     allowedHeaders: ["my-custom-header"],
// //     credentials: true
// //   }
// // });

// let io;
// // import express, { Express, Request, Response } from 'express';
// // import * as socketio from "socket.io";
// // import * as http from 'http';

// // const app: Express = express();
// // const server: http.Server = http.createServer(app);
// // let io: socketio.Server = new socketio.Server();
// // io.attach(server);

// export default  {
//   init: httpServer => {
//     io = require('socket.io')(httpServer);
//     return io;
//   },
//   getIO: () => {
//     if (!io) {
//       throw new Error('Socket.io not initialized!');
//     }
//     return io;
//   }
// };
*/
// export {}
