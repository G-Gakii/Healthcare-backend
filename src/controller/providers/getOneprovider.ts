import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../interface/auth.interface";
import Provider from "../../models/providers.model";

const getSingleProvider = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const provider = await Provider.findById(id).populate({
      path: "reviews",
      model: "Review",
    });
    if (!provider) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }
    res.status(200).json(provider);
    return;
  } catch (error) {
    let err = error as Error;
    res.status(500).json({ message: `internal server error ${error}` });
    return;
  }
};

export default getSingleProvider;
