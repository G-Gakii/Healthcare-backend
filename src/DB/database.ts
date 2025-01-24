import mongoose from "mongoose";
import "dotenv/config";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("connected");
  } catch (error) {
    console.log("connect failed", error);
  }
};

export default connectDb;
