const mongodb: any = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  userId: string;

  constructor(
    title: string,
    imageUrl: string,
    price: number,
    description: string,
    id: string,
    userId: string
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the Product
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
      .then((result: any) => {
        console.log(result);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db: any = getDb();

    return db
      .collection("products")
      .find()
      .toArray()
      .then((products: any) => {
        console.log(products);
        return products;
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }
  static findById(prodId: any) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product: any) => {
        // console.log(product);
        return product;
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  static deleteById(prodId: any) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result: any) => {
        console.log("Deleted");
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }
}

module.exports = Product;

export {};
