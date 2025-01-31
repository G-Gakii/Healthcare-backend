import { Request, Response } from "express";
import Provider from "../../models/providers.model";
import mongoose from "mongoose";

const deleteProvider = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const provider = await Provider.findByIdAndDelete(id);
    if (!provider) {
      res.status(400).json({ message: "Providers does not exist" });
      return;
    }
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Provider deleted successfully" });
    return;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    let err = error as Error;
    res.status(500).json({ message: "Internal server error" + err.message });
  } finally {
    session.endSession();
  }
};

export default deleteProvider;
