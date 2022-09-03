import { RequestHandler } from "express";

const mongoose = require("mongoose");

const Product = require("../models/product");
const Order = require("../models/order");

import PDFDocument from "pdfkit";
// const PDFDocument = require('pdfkit');


import path from "path";
import fs from "fs";

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

export const getInvoice: RequestHandler = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then((order: any) => {
      if (!order) {
        return next(new Error("No order found."));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error("Unauthorized"));
      }
      const invoiceName = "invoice-" + orderId + ".pdf";
      const invoicePath = path.join("data", "invoices", invoiceName);

      const pdfDoc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="' + invoiceName + '"'
      );
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(26).text("Invoice", {
        underline: true,
      });
      pdfDoc.text("-----------------------");
      let totalPrice = 0;
      order.products.forEach((prod: any) => {
        totalPrice += prod.quantity * prod.product.price;
        pdfDoc
          .fontSize(14)
          .text(
            prod.product.title +
              " - " +
              prod.quantity +
              " x " +
              "$" +
              prod.product.price
          );
      });
      pdfDoc.text("---");
      pdfDoc.fontSize(20).text("Total Price: $" + totalPrice);

      pdfDoc.end();
      // fs.readFile(invoicePath, (err, data) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   res.setHeader('Content-Type', 'application/pdf');
      //   res.setHeader(
      //     'Content-Disposition',
      //     'inline; filename="' + invoiceName + '"'
      //   );
      //   res.send(data);
      // });
      // const file = fs.createReadStream(invoicePath);

      // file.pipe(res);
    })
    .catch((err: any) => {
      const error = new Error(err);
      error.code = 500;
      return next(error);
    });
};

export {};
