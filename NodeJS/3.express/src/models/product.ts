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
  constructor(
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.title = title;
  }
  save() {
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
};
