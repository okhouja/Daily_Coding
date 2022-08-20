const db = require("../util/database");

const Cart = require("../models/cart");

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
  save() {}

  static deleteById(id: any) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id: any) {}
};
