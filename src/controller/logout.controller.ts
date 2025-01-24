import { Request, Response } from "express";
import { AuthenticatedRequest } from "../interface/auth.interface";
import { error } from "console";

export const logout = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    user.refreshToken = "";
    await user.save();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: `Internal server error: ${err.message}` });
  }
};
