import express, { RequestHandler } from "express";
const path = require("path");

export const get404: RequestHandler = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn,
  });
};

export {};
