import { Request, Response } from "express";
import Review from "../../models/review.model";
import reviewSchema from "../../validator/review.validator";
import mongoose from "mongoose";
import { AuthenticatedRequest } from "../../interface/auth.interface";

const editReview = async (req: AuthenticatedRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({ message: "user is not found" });
      return;
    }
    const { id } = req.params;
    const result = await reviewSchema.validateAsync(req.body);
    const review = await Review.findById(id);
    if (!review) {
      res.status(404).json({ message: "review not found" });
      return;
    }
    if (
      review.user.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      res.status(401).json({ message: "Unathorized " });
      return;
    }
    const myreview = await Review.findByIdAndUpdate(id, { ...result, user });
    await session.commitTransaction();

    res
      .status(200)
      .json({ message: `updated successfully `, review: myreview });
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
