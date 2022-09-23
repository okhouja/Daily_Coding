import { model, Schema, Document, Types } from "mongoose";
import { IUser } from "./user.model";

export interface IPost extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  imageUrl: string;
  content: string;
  creator: IUser["_id"];
  createdAt?: Date;
  updatedAt?: Date;
}
const postSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: {
      type: Schema.Types.String,
      required: true,
    },
    imageUrl: {
      type: Schema.Types.String,
      required: true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    creator: 
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    
  },
  { timestamps: true, versionKey: false }
);

const Post = model<IPost>("Post", postSchema);
export default Post;

export {};
