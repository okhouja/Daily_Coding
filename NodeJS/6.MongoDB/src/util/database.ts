const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const DB_HOST = process.env.DB_HOST;

// console.log(DB_HOST);

let _db: any;

const mongoConnect = (callback: any) => {
  MongoClient.connect(DB_HOST)
    .then((client: any) => {
      console.log("Connected to MongoDB!");
      _db = client.db();
      callback();
    })
    .catch((err: Error) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
export {}
