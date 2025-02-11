import mongoose, { Document } from "mongoose";

export interface User extends Document {
  //   _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  profilePic: string;
}
