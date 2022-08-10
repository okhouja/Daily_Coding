const fs = require("fs");
const path = require("path");

// const products: any = [];

module.exports = class Product {
  title: string;
  constructor(t: any) {
    this.title = t;
  }
  save() {
    const p = path.join(__dirname, "../data", "products.json");
    fs.readFile(p, (err: any, fileContent: any) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err: any) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb: any) {
    const p = path.join(__dirname, "../data", "products.json");

    fs.readFile(p, (err: any, fileContent: any) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
