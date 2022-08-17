const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "../data", "products.json");

const getProductFromFile = (cb: any) => {
  fs.readFile(p, (err: any, fileContent: any) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  id: string;

  constructor(
    title: string,
    imageUrl: string,
    price: number,
    description: string,
    id: string
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.id = id;
  }
  save() {
    this.id = Math.random().toString();
    getProductFromFile((products: any) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err: any) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb: any) {
    getProductFromFile(cb);
  }

  static findById(id: any, cb: any) {
    getProductFromFile((products: any) => {
      const product = products.find((p: any) => p.id === id);
      cb(product);
    });
  }
};
