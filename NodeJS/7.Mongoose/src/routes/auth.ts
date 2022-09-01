const express = require("express");
import { check, body } from "express-validator";

const authController = require("../controllers/auth");

const router = express.Router();

const User = require("../models/user");

const {
  validationLogin,
  validationSignup,
  validationResetPassword,
} = require("../middleware/validation-forms");

// const validateLogin2=  [
//     body("email")
//       .isEmail()
//       .withMessage("Please enter a valid email address.")
//       .normalizeEmail(),
//     body("password", "Password has to be valid.")
//       .isLength({ min: 5 })
//       .isAlphanumeric()
//       .trim(),
//   ],

// const validationSignup2=  [
//     check("email")
//       .isEmail()
//       .withMessage("Please enter a valid email.")
//       .custom((value, { req }) => {
//         // if (value === 'test@test.com') {
//         //   throw new Error('This email address if forbidden.');
//         // }
//         // return true;
//         return User.findOne({ email: value }).then((userDoc) => {
//           if (userDoc) {
//             return Promise.reject(
//               "E-Mail exists already, please pick a different one."
//             );
//           }
//         });
//       })
//       .normalizeEmail(),
//     body(
//       "password",
//       "Please enter a password with only numbers and text and at least 5 characters."
//     )
//       .isLength({ min: 5 })
//       .isAlphanumeric()
//       .trim(),
//     body("confirmPassword")
//       .trim()
//       .custom((value, { req }) => {
//         if (value !== req.body.password) {
//           throw new Error("Passwords have to match!");
//         }
//         return true;
//       }),
//   ]

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", validationLogin, authController.postLogin);

router.post("/signup", validationSignup, authController.postSignup);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", validationResetPassword,authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
