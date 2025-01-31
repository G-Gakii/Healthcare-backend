import { Request, Response } from "express";
import validateUser from "../validator/user.validator";
import User from "../models/user.model";
import * as argon2 from "argon2";
import { generateAccessToken } from "../token/user.token";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields required" });
      return;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ Message: `${email} is not registered` });
      return;
    }
    const isvalid = await argon2.verify(user.password, password);
    if (!isvalid) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateAccessToken(user._id.toString());
    const hashedRefreshToken = await argon2.hash(refreshToken);
    user.refreshToken = hashedRefreshToken;
    await user.save();
    res.status(200).json({ accessToken, refreshToken });
    return;
  } catch (error) {
    res.status(500).json({ message: `Internal server error ${error}` });
  }
};
