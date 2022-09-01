import { check, body } from "express-validator";
const User = require("../models/user");

const validationAddProd = [
  body("title").isString().isLength({ min: 3 }).trim(),
  body("imageUrl").isURL(),
  body("price").isFloat(),
  body("description").isLength({ min: 5, max: 400 }).trim(),
];

const validationEditProd =   [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("imageUrl").isURL(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ]

const validationConditions = [
  check("title")
    .isString()
    .isLength({ min: 5, max: 50 })
    .trim()
    .withMessage("Title must be at least 5 chars and max 50 chars"),
  check("imageUrl").isURL().trim().withMessage("Please enter a valid URL link"),
  check("price")
    .isFloat({ min: 0.0, max: 1000000.0 })
    .trim()
    .withMessage("Price can be positve value only"),
  check("description")
    .trim()
    .isLength({ min:10,max: 400 })
    .withMessage(
      "Please enter a valid Product desctription,minimum 10 and maximum 400 characters long."
    ),
];

const validationLogin = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  body("password", "Password has to be valid.")
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim(),
];

const validationSignup = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      // if (value === 'test@test.com') {
      //   throw new Error('This email address if forbidden.');
      // }
      // return true;
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(
            "E-Mail exists already, please pick a different one."
          );
        }
      });
    })
    .normalizeEmail(),
  body(
    "password",
    "Please enter a password with only numbers and text and at least 5 characters."
  )
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim(),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match!");
      }
      return true;
    }),

  //   check("name")
  //     .isString()
  //     .isLength({ min: 1, max: 50 })
  //     .trim()
  //     .withMessage("Title must be at least 1 chars and max 50 chars"),
  //   check("email")
  //     .isEmail()
  //     .withMessage("Please enter a valid email.")
  //     .custom((value, { req }) => {
  //       // if (value === 'test@test.com') {
  //       //   throw new Error('This email address if forbidden.');
  //       // }
  //       // return true;
  //       return User.findOne({ email: value }).then((userDoc) => {
  //         if (userDoc) {
  //           return Promise.reject(
  //             "E-Mail exists already, please pick a different one."
  //           );
  //         }
  //       });
  //     })
  //     .normalizeEmail(),
  //   body(
  //     "password",
  //     "Please enter a password with only numbers and text and at least 5 characters."
  //   )
  //     .isLength({ min: 5 })
  //     .isAlphanumeric()
  //     .trim(),
  //   body("confirmPassword")
  //     .trim()
  //     .custom((value, { req }) => {
  //       if (value !== req.body.password) {
  //         throw new Error("Passwords have to match!");
  //       }
  //       return true;
  //     }),
];

const validationResetPassword = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      // if (value === 'test@test.com') {
      //   throw new Error('This email address if forbidden.');
      // }
      // return true;
      return User.findOne({ email: value }).then((userDoc) => {
        if (!userDoc) {
          return Promise.reject(
            "Email does not exist, choose a different one."
          );
        }
      });
    })
    .normalizeEmail(),
];

module.exports = {
  validationAddProd,
  validationEditProd,
  validationConditions,
  validationLogin,
  validationSignup,
  validationResetPassword,
};

export {};
