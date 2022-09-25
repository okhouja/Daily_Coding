import { RequestHandler } from "express";

import { validationResult } from "express-validator";

const crypto = require("crypto");

const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");

// console.log(process.env.My_Gmail);

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SG_API_KEY);

export const getLogin: RequestHandler = (req, res, next) => {
  let message: any= req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

export const getSignup: RequestHandler = (req, res, next) => {
  let message: any= req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};
export const postLogin: RequestHandler = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }
  // if no validation errors in the controller
  User.findOne({ email: email })
    .then((user: any) => {
      if (!user) {
        return res.status(422).render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          errorMessage: "Invalid email or password.",
          oldInput: {
            email: email,
            password: password,
          },
          validationErrors: [],
        });
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
          } else {
            // if Password is invalid
            return res.status(422).render("auth/login", {
              path: "/login",
              pageTitle: "Login",
              errorMessage: "Invalid email or password.",
              oldInput: {
                email: email,
                password: password,
              },
              validationErrors: [],
            });
          }
        })
        .catch((err: Error) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err: any) => {
      const error = new Error(err)
      error.code = 500;
      return next(error);
    });
};

export const postSignup: RequestHandler = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // console.log(errors.array());
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }
  // if no validation errors in the controller

  bcrypt
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
      const msg = {
        to: email,
        from: process.env.My_Gmail,
        subject: "Signup succeeded!",
        text: "Welcome to Node.js Shop Dev!",
        html: "<h1>You Successfully signed up!</h1>",
      };
      return sgMail.send(msg);
    })
    .then(() => {
      console.log("Email sent successfully!");
    })
    .catch((err: any) => {
      const error = new Error(err)
      error.code = 500;
      return next(error);
    });
};

export const postLogout: RequestHandler = (req, res, next) => {
  req.session.destroy((err: any) => {
    console.log(err);
    res.redirect("/");
  });
};

export const getReset: RequestHandler = (req, res, next) => {
  let message: any= req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

export const postReset: RequestHandler = (req, res, next) => {
  crypto.randomBytes(32, (err: any, buffer: any) => {
    if (err) {
      console.log(err);
      return res.status(422).render("auth/reset", {
        path: "/reset",
        pageTitle: "Reset Password",
        errorMessage: "Invalid email, please enter a different one",
        oldInput: {
          email: req.body.email,
        },
        validationErrors: [],
      });
    }

    // if no validation errors in the controller

    const token = buffer.toString("hex");
    console.log(token);

    User.findOne({ email: req.body.email })
      .then((user: any) => {
        // if user does not exist

        if (!user) {
          return res.status(422).render("auth/reset", {
            path: "/reset",
            pageTitle: "Reset Password",
            errorMessage: "Unregistered mail, please enter a different one",
            oldInput: {
              email: req.body.email,
            },
            validationErrors: [],
          });
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result: any) => {
        res.redirect("/");
        const resetMsg = {
          to: req.body.email,
          from: process.env.My_Gmail,
          subject: "Password reset",
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
            <p>- If someone else triggered this request or if you've remembered your password in the meantime, you can simply ignore this message and carry on using your old password. For security reasons, this link is only valid for 1 hour, after which time you'll need to request a new one.</p>
          `,
        };
        sgMail.send(resetMsg);
      })
      .catch((err: any) => {
        const error = new Error(err)
        error.code = 500;
        return next(error);
      });
  });
};

export const getNewPassword: RequestHandler = (req, res, next) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user: any) => {
      let message: any= req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err: any) => {
      const error = new Error(err)
      error.code = 500;
      return next(error);
    });
};

export const postNewPassword: RequestHandler = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser: any;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user: any) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result: any) => {
      res.redirect("/login");
    })
    .catch((err: any) => {
      const error = new Error(err)
      error.code = 500;
      return next(error);
    });
};

export {};
