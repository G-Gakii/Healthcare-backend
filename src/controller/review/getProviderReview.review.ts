import { Request, Response } from "express";
import Review from "../../models/review.model";
import mongoose from "mongoose";

const getreviewByProvider = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reviews = await Review.find({ provider: id });
    console.log(reviews);

    res.status(200).json(reviews);
    return;
  } catch (error) {
    const err = error as Error;

    res.status(500).json({ message: err.message });
    return;
  }
};

export default getreviewByProvider;
