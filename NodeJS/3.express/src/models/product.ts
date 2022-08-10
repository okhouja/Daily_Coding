const products: any = [];

module.exports = class Product {
  title: string;
  constructor(t:any) {
    this.title = t;
  }
  save() {
    products.push(this);
  }
  static fetchAll() {
    return products;
  }
};
