import express, { Request, Response, NextFunction } from "express";
const Product = require("../models/product");

exports.getAddProduct = (req: Request, res: Response, next: NextFunction) => {
  res.render("admin/add-product", {
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

exports.getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.fetchAll((products: any) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
