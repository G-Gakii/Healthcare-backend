import { Request } from "express";
import { Document } from "mongoose";
import { UserInterface } from "./user.interface";

export interface AuthenticatedRequest extends Request {
  user?: Document<any, any, UserInterface> & UserInterface & { _id: string };
  payload?: any;
}
