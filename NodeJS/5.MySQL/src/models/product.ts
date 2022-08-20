import Sequelize from "sequelize";

const sequelize = require("../util/database");

const Product = sequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;

// const db = require("../util/database");

// const Cart = require("../models/cart");

// module.exports = class Product {
//   id: string;
//   title: string;
//   imageUrl: string;
//   price: number;
//   description: string;

//   constructor(
//     id: string,
//     title: string,
//     imageUrl: string,
//     price: number,
//     description: string
//   ) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//     this.id = id;
//   }
//   save() {
//     return db.execute(
//       "INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?) ",
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }

//   static deleteById(id: any) {}

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   static findById(id: any) {
//     return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
//   }
// };
