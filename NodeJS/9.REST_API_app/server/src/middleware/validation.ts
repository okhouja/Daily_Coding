import {  body } from "express-validator";

export const validationAddPost = [
  body("title").isString().isLength({ min: 5,max: 200 }).trim(),
  body("content").isLength({ min: 5, max: 400 }).trim(),
];

export {};
