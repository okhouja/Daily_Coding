import express, { Request, Response, NextFunction } from "express";
const path = require("path");
const rootDir = require("../util/path");
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/edit-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
