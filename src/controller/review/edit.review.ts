import { Request, Response } from "express";
import Review from "../../models/review.model";
import reviewSchema from "../../validator/review.validator";
import mongoose from "mongoose";

const editReview = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const result = await reviewSchema.validateAsync(req.body);
    const review = await Review.findByIdAndUpdate(id, result);
    if (!review) {
      res.status(404).json({ message: "review not found" });
      return;
    }
    await session.commitTransaction();

    res.status(200).json({ message: `updated successfully `, review: review });
    return;
  } catch (error) {
    const err = error as Error;
    await session.abortTransaction();
    res.status(500).json({ message: err.message });
    return;
  } finally {
    session.endSession();
  }
};

export default editReview;
