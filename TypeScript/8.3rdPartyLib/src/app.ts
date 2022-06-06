//  import _ from 'lodash'

// console.log(_.shuffle([1,2,3,4]));

import { Product } from "./productModel";

const products = [
  { title: "A Vase", price: 5.99 },
  { title: "A Book", price: 7.95 },
];

// const p1 = new Product("A Book", 12.99);

const loadedProducts = products.map((prod) => {
  return new Product(prod.title, prod.price);
});

for ( const prod of loadedProducts ) {
    console.log(prod.getInformation());
    
}

// console.log(p1.getInformation());
