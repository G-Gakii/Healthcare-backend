import { Client } from "@googlemaps/google-maps-services-js";
import { Response, Request } from "express";
import Provider from "../models/providers.model";

const nearestProvider = async (req: Request, res: Response) => {
  const { latitude, longitude, specialization } = req.params;
  try {
    const providers = await Provider.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(latitude), parseFloat(longitude)],
          },
          $maxDistance: 20000,
        },
      },
      specialization: { $in: [specialization] },
    });
    res.status(200).json(providers);
    return;
  } catch (error) {
    const err = error as Error;

    res.status(500).json({ message: err.message });
    return;
  }
};

export default nearestProvider;
