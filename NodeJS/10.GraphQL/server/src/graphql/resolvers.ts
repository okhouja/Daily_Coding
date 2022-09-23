import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

import User from "../models/user.model";

// to test it in localhost:8080/graphql
/* 
mutation {
  createUser(userInput: {email: "test@test.com", name: "Omar", password: "12345"}) {
    _id
    email
  }
}

*/

export default {
  createUser: async function ({ userInput }, req) {
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
  login: async function ({ email, password }) {
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
};
