import express, { RequestHandler } from "express";
const Product = require("../models/product");

export const getAddProduct: RequestHandler = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

export const postAddProduct: RequestHandler = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result: any) => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err: Error) => console.log(err));
};

export const getEditProduct: RequestHandler = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // req.user;
  // .getProducts({ WHERE: { id: prodId } })
  Product.findByPk(prodId)
    .then((products: any) => {
      const product = products;
      // console.log(product);

      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err: Error) => console.log(err));
};

export const postEditProduct: RequestHandler = async (req, res, next) => {
  // const prodId = req.body.productId;
  // const updatedTitle = req.body.title;
  // const updatedPrice = req.body.price;
  // const updatedImageUrl = req.body.imageUrl;
  // const updatedDesc = req.body.description;

  const { productId, title, description, imageUrl, price } = req.body;

  try {
    await Product.update(
      { title, description, imageUrl, price },
      { where: { id: productId } }
    )
      // await Product.update(
      //   {
      //     title: updatedTitle,
      //     price: updatedPrice,
      //     imageUrl: updatedImageUrl,
      //     description: updatedDesc,
      //   },
      //   {
      //     WHERE: { id: prodId },
      //   }
      // )
      .then((result: any) => {
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/products");
      });
  } catch (err) {
    console.log(err);
  }
};

export const getProducts: RequestHandler = (req, res, next) => {
  req.user
    .getProducts()
    .then((products: any) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const postDeleteProduct: RequestHandler = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product: any) => {
      return product.destroy();
    })
    .then((result: any) => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err: Error) => {
      console.log(err);
    });
};
