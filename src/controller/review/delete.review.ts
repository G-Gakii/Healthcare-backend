import { Request, Response } from "express";
import Review from "../../models/review.model";
import reviewSchema from "../../validator/review.validator";
import mongoose from "mongoose";
import { AuthenticatedRequest } from "../../interface/auth.interface";

const deleteReview = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({ message: "user is not found" });
      return;
    }
    const { id } = req.params;
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
    await Review.findByIdAndDelete(id);
    if (!review) {
      res.status(404).json({ message: "review not only" });
      return;
    }
    res.status(200).json({ message: "review deleted successfully" });
  } catch (error) {
    const err = error as Error;

    res.status(500).json({ message: err.message });
    return;
  }
};

export default deleteReview;
