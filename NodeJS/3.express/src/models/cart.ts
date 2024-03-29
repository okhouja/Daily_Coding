export {};

const fs: any = require("fs")
const path: any= require("path");

const p = path.join(__dirname, "../data", "cart.json");

module.exports = class Cart {
  static addProduct(id: any, productPrice: any) {
    type cart = {
      products: string;
      totalPrice: number;
    };
    // Fetch the previos cart
    fs.readFile(p, (err: any, fileContent: any) => {
      let products: any[] =[];
      let cart = { products, totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing products
      const existingProductIndex: any = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct: any = cart.products[existingProductIndex];
      let updatedProduct: any;
      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = {...existingProduct};
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err:any) => {
        console.log(err);
      });
    });
  }
  static deleteProduct(id: any, productPrice: number) {
    fs.readFile(p, (err: any, fileContent:any) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod: any) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod: any) => prod.id !== id
      );

      updatedCart.totalPrice =
        updatedCart.totalPrice - product.totalPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err:any) => {
        console.log(err);
      });
    });
  }

  static getCart(cb: any) {
    fs.readFile(p, (err: any, fileContent:any) => {
      const cart = JSON.parse(fileContent.toString());
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
