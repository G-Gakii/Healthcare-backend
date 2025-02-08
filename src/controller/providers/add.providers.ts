import { Request, Response } from "express";

import mongoose from "mongoose";
import providerSchema from "../../validator/providers.validator";
import Provider from "../../models/providers.model";
import { AuthenticatedRequest } from "../../interface/auth.interface";

const addProviders = async (req: AuthenticatedRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await providerSchema.validateAsync(req.body);
    const { name } = result;

    const existisingProvider = await Provider.findOne({
      name: name,
    });
    if (existisingProvider) {
      res.status(409).json({ message: "Provider already exist" });
      await session.abortTransaction();

      return;
    }
    const providers = new Provider(result);
    await providers.save({ session });

    await session.commitTransaction();
    session.endSession();
    res
      .status(201)
      .json({ message: "providers added successfully", providers });
    return;
  } catch (error) {
    let err = error as Error;
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: err.message });
    return;
  } finally {
    session.endSession();
  }
};

export default addProviders;
