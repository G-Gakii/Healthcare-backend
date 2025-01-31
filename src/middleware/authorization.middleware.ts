import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../interface/auth.interface";

const authorizedUser = (role: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    if (!role.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
};
export default authorizedUser;
