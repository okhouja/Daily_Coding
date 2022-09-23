import { model, Schema, Document, Types } from "mongoose";
import { IPost } from "./post.model";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  status: string;
  posts: IPost["_id"];
  // posts: any;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      default: "I am new!",
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const User = model<IUser>("User", userSchema);
export default User;

export {};
