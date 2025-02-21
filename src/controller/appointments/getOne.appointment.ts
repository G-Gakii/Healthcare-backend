import { Request, Response } from "express";
import mongoose from "mongoose";

import Appointment from "../../models/appointment.models";
import { AuthenticatedRequest } from "../../interface/auth.interface";

const getAppointmentByUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const currentDate = new Date();

    const yourAppointment = await Appointment.find({
      user: user._id,
      date: { $gte: currentDate },
    }).populate("provider", "name");

    res.status(200).json(yourAppointment);
    return;
  } catch (error) {
    const err = error as Error;

    res.status(500).json({ message: err.message });
    return;
  }
};

export default getAppointmentByUser;
