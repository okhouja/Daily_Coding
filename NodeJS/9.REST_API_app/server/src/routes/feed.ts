import express from "express";

const feedController = require("../controllers/feed");

const router = express.Router();

import { validationAddPost } from "../middleware/validation";

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post
router.post("/post", validationAddPost, feedController.createPost);

router.get('/post/:postId', feedController.getPost)

module.exports = router;
