import { Document, ObjectId } from "mongoose";

export interface UserInterface extends Document {
  _id: string;
  username?: string;
  email: string;
  password: string;
  role: string;
  refreshToken: string;
}
