import { body } from "express-validator";
import User from "../models/user.model";

export const validationAddPost = [
  body("title").isLength({ min: 5, max: 200 }).trim(),
  body("content").isLength({ min: 5, max: 400 }).trim(),
];

export const validationSignup = [
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("E-Mail address already exists!");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
];

export const validationStatus = [
    body("status").trim().not().isEmpty()
];
export {};
