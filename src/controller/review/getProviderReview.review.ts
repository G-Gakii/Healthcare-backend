import { Request, Response } from "express";
import Review from "../../models/review.model";

const getreviewByProvider = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    const reviews = await Review.find({ provider: providerId });
    res.status(200).json(reviews);
    return;
  } catch (error) {
    const err = error as Error;

    res.status(500).json({ message: err.message });
    return;
  }
};

export default getreviewByProvider;
