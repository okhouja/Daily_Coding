//  import _ from 'lodash'

// console.log(_.shuffle([1,2,3,4]));

import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { Product } from "./productModel";

const products = [
  { title: "A Vase", price: 5.99 },
  { title: "A Book", price: 7.95 },
];

const newProd = new Product("", -5.99);
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log("VALIDATION ERROR!");
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});

// const p1 = new Product("A Book", 12.99);

// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

// console.log(p1.getInformation());
