import express, { Request, Response } from "express";
import validateUser from "../validator/user.validator";
import User from "../models/user.model";
import * as argon2 from "argon2";
import { generateAccessToken, generateRefreshToken } from "../token/user.token";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const { username, email, password, role } = req.body;
    let existinguser = await User.findOne({ email: email });
    if (existinguser) {
      res.status(409).json({
        message: `User with email ${existinguser.email} already exist `,
      });
      return;
    }

    let hashedPassword = await argon2.hash(password);

    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });
    const newUser = await user.save();
    const accessToken = await generateAccessToken(newUser._id.toString());
    const refreshToken = await generateRefreshToken(newUser._id.toString());
    const hashedRefreshToken = await argon2.hash(refreshToken);
    newUser.refreshToken = hashedRefreshToken;
    await newUser.save();
    res.json({ accessToken, refreshToken });
    return;
  } catch (error) {
    let err = error as Error;
    console.log(err);

    res.status(500).json({ message: "Internal server error", err });
    return;
  }
};
