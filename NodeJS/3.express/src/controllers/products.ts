import express, { Request, Response, NextFunction } from "express";
const path = require("path");


const products : any = [];


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
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProduct = (req: Request, res: Response, next: NextFunction)  => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productsCSS: true,
    
  });
}
// module.exports = productsController;
