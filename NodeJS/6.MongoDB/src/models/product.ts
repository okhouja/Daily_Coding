const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  //   id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;

  constructor(
    // id: string,
    title: string,
    imageUrl: string,
    price: number,
    description: string
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    // this.id = id;
  }
  save() {
    const db: any = getDb();
    return db
      .collection("products")
      .insertOne(this)
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
        console.log(product);
        return product;
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }
}

module.exports = Product;
