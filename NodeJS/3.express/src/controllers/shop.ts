import express, { Request, Response, NextFunction } from "express";

const Cart = require("../models/cart");

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
  Product.findById(prodId, (product: any) =>
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    })
  );
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

exports.postCart = (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product: any) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
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
