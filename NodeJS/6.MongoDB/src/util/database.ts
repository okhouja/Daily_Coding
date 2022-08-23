const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const DB_HOST= process.env.DB_HOST ;

// console.log(DB_HOST);

const mongoConnect = (callback: any) => {
  MongoClient.connect(DB_HOST)
    .then((client: any) => {
      console.log("Connected to MongoDB!");
      callback(client);
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

module.exports = mongoConnect;