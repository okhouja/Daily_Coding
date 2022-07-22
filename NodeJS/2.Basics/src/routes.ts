const fs = require("fs");

const requestHandler = (req: any, res: any) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title><head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body: any = [];
    req.on("data", (chunk: any) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1> Hello From my Node.js Server</h1></body>");
  res.write("</html>");
  res.end();
};

/* 
    1.

module.exports = requestHandler;

    2.

module.exports ={
    handler: requestHandler,
    someText: 'Some hard coded Text'
}
    3.

module.exports.handler= requestHandler;
module.exports.someText= someText;

*/
exports.handler = requestHandler;
exports.someText = "Some hard coded Text";
