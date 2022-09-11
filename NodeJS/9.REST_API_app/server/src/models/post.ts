import mongoose,{ Model, Schema, model } from "mongoose";

export interface Post {
    title: string;
    imageUrl: string;
    content: string;
    creator: object;
}
const postSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Object,
      required: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const Post = model("Post", postSchema);
export default Post

export {};
