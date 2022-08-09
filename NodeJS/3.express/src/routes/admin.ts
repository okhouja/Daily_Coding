import express, { Request, Response, NextFunction } from "express";
// const rootDir = require("../util/path");
const path = require("path");


const productsController = require("../controllers/products");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productsController.getAddProduct);

// /admin/edit-product => POST
router.post("/add-product", productsController.postAddProduct);

module.exports = router;