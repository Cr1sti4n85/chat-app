import mongoose, { Schema } from "mongoose";
import { User } from "../types/user.types";

const UserSchema: Schema = new Schema<User>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
