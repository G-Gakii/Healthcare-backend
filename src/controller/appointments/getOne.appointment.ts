import { Request, Response } from "express";
import mongoose from "mongoose";
import appointmentSchema from "../../validator/appointment.validator";
import Appointment from "../../models/appointment.models";
import { AuthenticatedRequest } from "../../interface/auth.interface";

const getAppointmentByUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
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

    (await session).commitTransaction();

    res.status(200).json(yourAppointment);
    return;
  } catch (error) {
    const err = error as Error;
    (await session).abortTransaction();
    res.status(500).json({ message: err.message });
    return;
  } finally {
    session.endSession();
  }
};

export default getAppointmentByUser;
