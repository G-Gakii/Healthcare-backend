import { Request, Response } from "express";
import mongoose from "mongoose";
import Provider from "../../models/providers.model";
import { stringify } from "querystring";

const getProviders = async (req: Request, res: Response) => {
  try {
    const providers = await Provider.find({}).populate({
      path: "reviews",
      model: "Review",
    });
    res.status(200).json({ providers: providers });
    return;
  } catch (error) {
    const err = error as Error;

    res.status(500).json({ message: err.message });
    return;
  }
};

export default getProviders;
