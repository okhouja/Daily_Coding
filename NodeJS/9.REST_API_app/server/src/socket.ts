// import { Server } from 'socket.io';

// const WEBSOCKET_CORS = {
//    origin: "*",
//    methods: ["GET", "POST"]
// }

// class Websocket extends Server {

//    private static io: Websocket;

//    constructor(httpServer) {
//        super(httpServer, {
//            cors: WEBSOCKET_CORS
//        });
//    }

//    public static getInstance(httpServer?): Websocket {

//        if (!Websocket.io) {
//            Websocket.io = new Websocket(httpServer);
//        }

//        return Websocket.io;

//    }
// }

// export default Websocket;


let io;

export default  {
  init: httpServer => {
    io = require('socket.io')(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};


export {}