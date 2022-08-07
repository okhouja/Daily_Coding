import express, { Request, Response, NextFunction } from "express";
const path = require("path");
const rootDir = require("../util/path");
const router = express.Router();

const products: any = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Product" });
});

// /admin/edit-product => POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
