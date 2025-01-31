import { Request, Response } from "express";
import Review from "../../models/review.model";
import reviewSchema from "../../validator/review.validator";
import mongoose from "mongoose";

const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      res.status(404).json({ message: "review not only" });
      return;
    }
    res.status(200).json({ message: "review delete successfully" });
  } catch (error) {
    const err = error as Error;

    res.status(500).json({ message: err.message });
    return;
  }
};

export default deleteReview;
