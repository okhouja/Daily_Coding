import express from "express";

const feedController = require("../controllers/feed");
const isAuth = require('../middleware/is-auth');


const router = express.Router();

import { validationAddPost } from "../middleware/validation";

// GET /feed/posts
router.get("/posts", isAuth,feedController.getPosts);

// POST /feed/post
router.post("/post", validationAddPost, feedController.createPost);

router.get("/post/:postId", isAuth, feedController.getPost);

router.put("/post/:postId", validationAddPost, feedController.updatePost);

router.delete("/post/:postId",  isAuth,feedController.deletePost);

module.exports = router;