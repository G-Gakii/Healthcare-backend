import { timeStamp } from "console";
import { string } from "joi";
import mongoose from "mongoose";
import { UserInterface } from "../interface/user.interface";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,

      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "user"],

      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;
