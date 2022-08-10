import express, { Request, Response, NextFunction } from "express";
// const path = require("path");

const Product = require("../models/product");

// const products : any = [];

exports.getAddProduct = (req: Request, res: Response, next: NextFunction) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req: Request, res: Response, next: NextFunction) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProduct = (req: Request, res: Response, next: NextFunction) => {
  Product.fetchAll((products: any) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productsCSS: true,
    });
  });
};
// module.exports = productsController;
