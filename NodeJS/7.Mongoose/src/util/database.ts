// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

// const DB_HOST = process.env.DB_HOST;

// let _db: any;

// export const mongoConnect = (callback: any) => {
//   MongoClient.connect(DB_HOST)
//     .then((client: any) => {
//       console.log("Connected to MongoDB!");
//       _db = client.db();
//       callback();
//     })
//     .catch((err: Error) => {
//       console.log(err);
//       throw err;
//     });
// };

// export const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "No database found!";
// };

// export {};
