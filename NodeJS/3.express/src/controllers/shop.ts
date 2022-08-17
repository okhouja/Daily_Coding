import express, { Request, Response, NextFunction } from "express";

const Product = require("../models/product");

exports.getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.fetchAll((products: any) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Product",
      path: "/products",
    });
  });
};

exports.getProduct = (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product: any) => console.log(product));
  res.redirect("/");
};

exports.getIndex = (req: Request, res: Response, next: NextFunction) => {
  Product.fetchAll((products: any) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req: Request, res: Response, next: NextFunction) => {
  res.render("shop/cart", { path: "/cart", pageTitle: "Your Cart" });
};

exports.getOrders = (req: Request, res: Response, next: NextFunction) => {
  res.render("shop/orders", { path: "/orders", pageTitle: "Your Orders" });
};

exports.getCheckout = (req: Request, res: Response, next: NextFunction) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

// module.exports = productsController;
