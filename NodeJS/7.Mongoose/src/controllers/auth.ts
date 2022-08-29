import { RequestHandler } from "express";
const User = require("../models/user");

export const getLogin: RequestHandler = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

export const postLogin: RequestHandler = (req, res, next) => {
  User.findById("5bab316ce0a7c75f783cb8a8")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err: any) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err: any) => console.log(err));
};

export const postLogout: RequestHandler = (req, res, next) => {
  req.session.destroy((err: any) => {
    console.log(err);
    res.redirect("/");
  });
};

export {};
