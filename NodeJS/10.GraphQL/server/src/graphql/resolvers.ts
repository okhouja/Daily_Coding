import bcrypt from "bcrypt";
import mongoose from "mongoose";


import User from '../models/user.model'


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
  createUser: async function({ userInput }, req) {
    //   const email = args.userInput.email;
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('User exists already!');
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
    _id: new mongoose.Types.ObjectId(),
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });
    const createdUser = await user.save();
    return { ...createdUser.toObject(), _id: createdUser._id.toString() };
  }
};
