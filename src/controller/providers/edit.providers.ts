import { Request, Response } from "express";
import Provider from "../../models/providers.model";
import providerSchema, {
  singleProviderSchema,
} from "../../validator/providers.validator";
import mongoose from "mongoose";

const editProvider = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;

    const result = await singleProviderSchema.validateAsync(req.body);
    const provider = await Provider.findByIdAndUpdate(id, result, {
      new: true,
      session,
    });
    if (!provider) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }
    const myProvider = await Provider.findById(id);
    await session.commitTransaction();

    res.status(200).json({ message: "updated successfully", myProvider });
    return;
  } catch (error) {
    const err = error as Error;
    await session.abortTransaction();

    res.status(500).json({ message: "internal server error " + err.message });
    return;
  } finally {
    session.endSession();
  }
};

export default editProvider;
