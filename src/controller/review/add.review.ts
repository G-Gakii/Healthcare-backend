import { Request, Response } from "express";
import mongoose from "mongoose";
import appointmentSchema from "../../validator/appointment.validator";
import Appointment from "../../models/appointment.models";
import reviewSchema from "../../validator/review.validator";
import Review from "../../models/review.model";

const ReviewProvider = async (req: Request, res: Response) => {
  const session = mongoose.startSession();
  (await session).startTransaction();
  try {
    const review = await reviewSchema.validateAsync(req.body);
    const user = await review.user;
    const existingUser = await Review.findOne({ user: user });
    if (existingUser) {
      res
        .status(409)
        .json({ message: "you have already reviewed the provider" });
      return;
    }
    const newreview = new Review(review);
    const myreview = await newreview.save();
    (await session).commitTransaction();

    res.status(201).json(myreview);
    return;
  } catch (error) {
    const err = error as Error;
    (await session).abortTransaction();
    res.status(500).json({ message: err.message });
    return;
  } finally {
    (await session).endSession();
  }
};

export default ReviewProvider;
