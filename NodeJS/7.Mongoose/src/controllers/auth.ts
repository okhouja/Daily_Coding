import { RequestHandler } from "express";

const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SG_API_KEY);

export const getLogin: RequestHandler = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

export const getSignup: RequestHandler = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};
export const postLogin: RequestHandler = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user: any) => {
      if (!user) {
        req.flash("error", "Invalid email or password!");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch: any) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err: Error) => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password!");
          res.redirect("/login");
        })
        .catch((err: Error) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err: Error) => console.log(err));
};

export const postSignup: RequestHandler = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash("error", "Email Already Exists, please try another Email.");
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result: any) => {
          res.redirect("/login");
          return sgMail.send({
            to: email,
            from: "liebelos1@gmail.com",
            subject: "Signup succeeded!",
            html: "<h1>You Successfully signed up!</h1>",
            text: "Welcome to Node.js Shop Dev!",
          });
        })
        .then(() => {
          console.log("Email sent successfully!");
        })
        .catch((err: Error) => console.log(err));
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const postLogout: RequestHandler = (req, res, next) => {
  req.session.destroy((err: any) => {
    console.log(err);
    res.redirect("/");
  });
};

export {};
