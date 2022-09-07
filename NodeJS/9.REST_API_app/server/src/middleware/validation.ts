import { check, body } from "express-validator";

const validationAddPost = [
  body("title").isString().isLength({ min: 5,max: 200 }).trim(),
  body("content").isLength({ min: 5, max: 400 }).trim(),
];

module.exports = { validationAddPost };

export {};
