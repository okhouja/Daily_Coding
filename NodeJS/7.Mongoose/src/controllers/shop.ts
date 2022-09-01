import { RequestHandler } from "express";

const mongoose = require("mongoose");

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
    .catch((err: any) => {
      const error = new Error(err);
      error.code = 500;
      return next(error);
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
    .catch((err: any) => {
      const error = new Error(err);
      error.code = 500;
      return next(error);
    });
};

export const getIndex: RequestHandler = (req, res, next) => {
  Product.find()
    .then((products: any) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        csrfToken: req.csrfToken(),
      });
    })
    .catch((err: any) => {
      const error = new Error(err);
      error.code = 500;
      return next(error);
    });
};

export const getCart: RequestHandler = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    // .execPopulate()
    .then((user: any) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        // products: user.cart.items.map((product) => {
        //   return { ...product.productId._doc, quantity: product.quantity };
        // }),
      });
    })
    .catch((err: any) => {
      const error = new Error(err);
      error.code = 500;
      return next(error);
    });
};

export const postCart: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  // const addToCart = User.addToCart()
  Product.findById(prodId)
    .then((product: any) => {
      return req.user.addToCart(product);
    })
    .then((result: any) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err: any) => {
      const error = new Error(err);
      error.code = 500;
      return next(error);
    });
};

export const postCartDeleteProduct: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result: any) => {
      res.redirect("/cart");
    })
    .catch((err: any) => {
      const error = new Error(err);
      error.code = 500;
      return next(error);
    });
};

export const postOrder: RequestHandler = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    // .execPopulate()
    .then((user: any) => {
      const products = user.cart.items.map((i: any) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),

        user: {
          email: req.user.email,
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
    .catch((err: any) => {
      const error = new Error(err);
      error.code = 500;
      return next(error);
    });
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
    .catch((err: any) => {
      const error = new Error(err);
      error.code = 500;
      return next(error);
    });
};

export {};
