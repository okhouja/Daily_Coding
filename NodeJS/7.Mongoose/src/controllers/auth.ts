import { RequestHandler } from "express";

export const getLogin: RequestHandler = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.isLoggedIn,
  });
};

export const postLogin: RequestHandler = (req, res, next) => {
  req.isLoggedIn = true;
  res.redirect("/");
};

export {};
