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