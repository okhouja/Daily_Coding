const http = require("http");

const server = http.createServer((req: any, res: any) => {
  console.log(req);
});

server.listen(3000);
