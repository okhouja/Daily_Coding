import express, { RequestHandler } from "express";

const Cart = require("../models/cart");

const Product = require("../models/product");

export const getProducts: RequestHandler = (req, res, next) => {
  Product.fetchAll((products: any) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Product",
      path: "/products",
    });
  });
};

export const getProduct: RequestHandler = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product: any) =>
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    })
  );
};

export const getIndex: RequestHandler = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]: any) => {
    res
      .render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      })
      
  });
};


// export const getIndex: RequestHandler = async (req, res, next) => {
//   try {
//     const fetchAllData = await Product.fetchAll();
//     const [rows, fieldData]: any = [];
//     res.status(200).json(fetchAllData).render("shop/index", {
//       prods: rows,
//       pageTitle: "Shop",
//       path: "/",
//     });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };


export const getCart: RequestHandler = (req, res, next) => {
  Cart.getCart((cart: any) => {
    Product.fetchAll((products: any) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod: any) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

export const postCart: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product: any) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

export const postCartDeleteProduct: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product: any) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

export const getOrders: RequestHandler = (req, res, next) => {
  res.render("shop/orders", { path: "/orders", pageTitle: "Your Orders" });
};

export const getCheckout: RequestHandler = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

// module.exports = productsController;
