import bcrypt from "bcrypt";
import mongoose, { Schema, Types } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import Post from "../models/post.model";
import { Request } from "express";
import { clearImage } from "../util/multer";

// to test it in localhost:8080/graphql
/* 
mutation {
  createUser(userInput: {email: "test@test.com", name: "Omar", password: "12345"}) {
    _id
    email
  }
}


********
mutation {
  createPost(postInput: {title: "tests", content: "tests", imageUrl: "SomeUrl"}) {
    _id
    title
  }
} 

******

*/

export default {
  createUser: async function ({ userInput }: { userInput: any }, req: Request) {
    //   const email = args.userInput.email;
    const errors: any = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({
        message: "Invalid email,Please enter a valid email address",
      });
    }
    if (
      validator.isEmail(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: " Password must be at least 5 characters" });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      errors.data = errors;
      errors.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists already!");
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });
    const createdUser = await user.save();
    return { ...createdUser.toObject(), _id: createdUser._id.toString() };
  },
  login: async function ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User not found!");
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Password is incorrect!");
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user.id.toString(),
        email: user.email,
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    return { token: token, userId: user._id.toString() };
  },
  createPost: async function ({ postInput }: { postInput: any }, req: Request) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const errors: any = [];
    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: "Title is invalid." });
    }
    if (
      validator.isEmpty(postInput.content) ||
      !validator.isLength(postInput.content, { min: 5 })
    ) {
      errors.push({ message: "Content is invalid." });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const user: any = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Invalid user.");
      error.code = 401;
      throw error;
    }
    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      title: postInput.title,
      content: postInput.content,
      imageUrl: postInput.imageUrl,
      creator: user,
    });
    const createdPost = await post.save();
    user.posts.push(createdPost);
    await user.save();
    return {
      ...createdPost.toObject(),
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt?.toISOString(),
      updatedAt: createdPost.updatedAt?.toISOString(),
    };
  },
  posts: async function ({ page }: { page: number }, req: Request) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    if (!page) {
      page = 1;
    }
    const perPage = 2;

    const totalPosts = await Post.find().countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("creator");
    return {
      posts: posts.map((p) => {
        return {
          ...p.toObject(),
          _id: p._id.toString(),
          createdAt: p.createdAt?.toISOString(),
          updateAt: p.updatedAt?.toISOString(),
        };
      }),
      totalPosts: totalPosts,
    };
  },
  post: async function ({ id }: { id: string }, req: Request) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const post = await Post.findById(id).populate("creator");
    if (!post) {
      const error = new Error("No post found!");
      error.code = 404;
      throw error;
    }
    return {
      ...post.toObject(),
      _id: post._id.toString(),
      createdAt: post.createdAt?.toISOString(),
      undefined: post.updatedAt?.toISOString(),
    };
  },
  updatePost: async function (
    { id, postInput }: { id: string; postInput: any },
    req: Request
  ) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const post = await Post.findById(id).populate("creator");
    if (!post) {
      const error = new Error("No post found!");
      error.code = 404;
      throw error;
    }
    if (post.toObject().creator._id.toString() !== req.userId.toString()) {
      const error = new Error("Not authorized!");
      error.code = 403;
      throw error;
    }
    const errors: any = [];
    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: "Title is invalid." });
    }
    if (
      validator.isEmpty(postInput.content) ||
      !validator.isLength(postInput.content, { min: 5 })
    ) {
      errors.push({ message: "Content is invalid." });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    post.title = postInput.title;
    post.title = postInput.title;
    post.content = postInput.content;
    if (postInput.imageUrl !== "undefined") {
      post.imageUrl = postInput.imageUrl;
    }
    const updatePost = await post.save();
    return {
      ...updatePost.toObject(),
      _id: updatePost._id.toString(),
      createdAt: updatePost.createdAt?.toISOString(),
      updatedAt: updatePost.updatedAt?.toISOString(),
    };
  },
  deletePost: async function ({ id }: { id: string }, req: Request) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const post = await Post.findById(id);
    if (!post) {
      const error = new Error("No post found!");
      error.code = 404;
      throw error;
    }
    if (post.creator.toString() !== req.userId.toString()) {
      const error = new Error("Not authorized!");
      error.code = 403;
      throw error;
    }
    clearImage(post.imageUrl);
    await Post.findByIdAndRemove(id);
    const user: any = await User.findById(req.userId);
    user.posts.pull(id);
    await user.save();
    return true;
  },
  user: async function (args: any, req: Request) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const user: any = await User.findById(req.userId);
    if (!user) {
      const error = new Error("No User found!");
      error.code = 404;
      throw error;
    }
    return {
      ...user._doc,
      _id: user._id.toString(),
    };
  },
  updateStatus: async function ({ status }: { status: string }, req: Request) {
    if (!req.isAuth) {
      const error = new Error("Not authenticated!");
      error.code = 401;
      throw error;
    }
    const user: any = await User.findById(req.userId);
    if (!user) {
      const error = new Error("No User found!");
      error.code = 404;
      throw error;
    }
    user.status = status;
    await user.save();
    return { ...user._doc, _id: user._id.toString() };
  },
};
