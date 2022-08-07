import express, { Request, Response, NextFunction } from "express";

const path = require("path");
const rootDir = require("../util/path");
const adminData = require("./admin");

// import { render } from 'pug';

const router = express.Router();

router.get("/", (req, res, next) => {
  //  console.log('shop',adminData.products);
  //  res.sendFile(path.join(rootDir, 'views','shop.html'))

  res.render('shop');
});

module.exports = router;
