import express, { RequestHandler } from "express";

const Product = require("../models/product");
const Order = require("../models/order");

export const getProducts: RequestHandler = (req, res, next) => {
  Product.find()
    .then((products: any) => {
      console.log(products);

      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const getProduct: RequestHandler = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product: any) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err: Error) => console.log(err));
};

export const getIndex: RequestHandler = (req, res, next) => {
  Product.find()
    .then((products: any) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const getCart: RequestHandler = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user: any) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err: any) => console.log(err));
};

export const postCart: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product: any) => {
      return req.user.addToCart(product);
    })
    .then((result: any) => {
      console.log(result);
      res.redirect("/cart");
    });
};

export const postCartDeleteProduct: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result: any) => {
      res.redirect("/cart");
    })
    .catch((err: any) => console.log(err));
};

export const postOrder: RequestHandler = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user: any) => {
      const products = user.cart.items.map((i: any) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result: any) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err: any) => console.log(err));
};

export const getOrders: RequestHandler = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders: any) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err: any) => console.log(err));
};

export {};
