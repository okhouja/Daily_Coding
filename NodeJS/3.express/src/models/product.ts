const fs = require("fs");
const path = require("path");

const Cart = require("../models/cart");

const p = path.join(__dirname, "../data", "products.json");

const getProductsFromFile = (cb: any) => {
  fs.readFile(p, (err: any, fileContent: any) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  description: string;

  constructor(
    id: string,
    title: string,
    imageUrl: string,
    price: number,
    description: string
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.id = id;
  }
  save() {
    getProductsFromFile((products: any) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod: any) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err: any) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err: any) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id: any) {
    getProductsFromFile((products: any) => {
      const product = products.find((prod:any) => prod.id === id);
      const updatedProducts = products.filter((prod: any) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err:any) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(cb: any) {
    getProductsFromFile(cb);
  }

  static findById(id: any, cb: any) {
    getProductsFromFile((products: any) => {
      const product = products.find((p: any) => p.id === id);
      cb(product);
    });
  }
};
