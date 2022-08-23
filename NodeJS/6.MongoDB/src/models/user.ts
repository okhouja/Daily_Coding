const mongodb: any = require("mongodb");
const getDb = require('  "../util/database" ').getDB;

const ObjectId = mongodb.ObjectId;

class User {
  username: string;
  email: string;

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((products: any) => {
        console.log(products);
        return products;
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  static findById(userId: string) {
    const db = getDb();
    return db.collection("users").find({ _id: new mongodb.ObjectId(userId) });
  }
}
module.exports = User;

export {};
