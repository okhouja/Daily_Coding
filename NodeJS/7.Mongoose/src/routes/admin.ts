import express from "express";

import { body } from "express-validator";

// const rootDir = require("../util/path");
// const path = require("path");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const {
    validationConditions
  ,
  validationEditProd,
} = require("../middleware/validation-forms");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/edit-product => POST
router.post(
  "/add-product",
  validationConditions,
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  validationConditions,
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
