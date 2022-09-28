// // let message: string;
// // message = "Hi there!";

// // console.log(message);

// const text =
//   "This is a test message from Deno! and it should be stored in a file";

// Deno.writeFile('message.txt', text);


import { serve } from "https://deno.land/std@0.157.0/http/server.ts";
 
function handler(_req: Request): Response {
  return new Response("Hello World!! \n :)");
}
 
serve(handler, { port: 3000 });