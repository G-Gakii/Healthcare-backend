import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { AuthenticatedRequest } from "../interface/auth.interface";

export const autheticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Unathorized" });
      return;
    }
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN as string) as {
      id: string;
    };
    const user = await User.findById(decode.id);
    if (!user) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: `internal server error ${error}` });
  }
};
