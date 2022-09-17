const express = require("express");

const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

import { validationSignup, validationStatus } from "../middleware/validation";

const router = express.Router();

router.put("/signup", validationSignup, authController.signup);

router.post("/login", authController.login);

router.get("/status", isAuth, authController.getUserStatus);

router.patch("/status", isAuth, validationStatus, authController.updateUserStatus);

module.exports = router;
