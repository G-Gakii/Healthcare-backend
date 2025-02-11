import { Request, Response } from "express";
import mongoose from "mongoose";
import appointmentSchema from "../../validator/appointment.validator";
import Appointment from "../../models/appointment.models";
import reviewSchema from "../../validator/review.validator";
import Review from "../../models/review.model";
import { AuthenticatedRequest } from "../../interface/auth.interface";
import Provider from "../../models/providers.model";

const ReviewProvider = async (req: AuthenticatedRequest, res: Response) => {
  const session = mongoose.startSession();
  (await session).startTransaction();
  try {
    const review = await reviewSchema.validateAsync(req.body);
    const { providerId } = req.params;
    const user = req.user?._id;
    const { rating } = review;

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const existingUser = await Review.findOne({
      user: user,
      provider: providerId,
    });
    if (existingUser) {
      res
        .status(409)
        .json({ message: "you have already reviewed the provider" });
      return;
    }
    const newreview = new Review({ ...review, user, provider: providerId });
    const myreview = await newreview.save();

    const reviews = await Review.find({ provider: providerId });

    const providerRating = reviews.map((review) => review.rating);
    const totalRating = providerRating.reduce(
      (acc, current) => acc + current,
      0
    );

    const averageRating = totalRating / providerRating.length;
    console.log(`average rating ${averageRating}`);

    const prov = await Provider.findById(providerId);

    const provide = await Provider.findByIdAndUpdate(
      providerId,
      { rate: averageRating },
      { new: true }
    );

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
