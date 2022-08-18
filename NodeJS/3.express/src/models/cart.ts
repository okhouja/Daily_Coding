import fs from "fs";
import { buffer } from "node:stream/consumers";
import path from "path";

const p = path.join(__dirname, "../data", "cart.json");

module.exports = class Cart {
  static addProduct(id: any, productPrice: any) {
    type cart = {
      products: any;
      totalPrice: number;
    };
    // Fetch the previos cart
    fs.readFile(p, (err: any, fileContent) => {
      let products: string[] = [];
      let cart = { products, totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent.toString());
      }
      // Analyze the cart => Find existing products
      const existingProductIndex: any = cart.products.findIndex(
        (prod) => prod[id] === id
      );
      const existingProduct: any = cart.products[existingProductIndex];
      let updatedProduct: any;
      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = [...existingProduct];
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
