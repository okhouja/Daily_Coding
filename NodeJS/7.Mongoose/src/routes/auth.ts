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
