import express, { Request, Response, NextFunction } from "express";
const path = require("path");

exports.get404 = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).render("404", { pageTitle: "Page Not Found !", path: ""});
  }