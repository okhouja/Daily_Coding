import express from "express";

const feedController = require("../controllers/feed");

const router = express.Router();

import { validationAddPost } from "../middleware/validation";

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post
router.post("/post", validationAddPost, feedController.createPost);

router.get("/post/:postId", feedController.getPost);

router.put("/post/:postId", validationAddPost, feedController.updatePost);

router.delete("/post/:postId", feedController.deletePost);

module.exports = router;
