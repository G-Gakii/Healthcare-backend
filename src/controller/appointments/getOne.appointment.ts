import { Request, Response } from "express";
import mongoose from "mongoose";
import appointmentSchema from "../../validator/appointment.validator";
import Appointment from "../../models/appointment.models";
import { AuthenticatedRequest } from "../../interface/auth.interface";

const getAppointmentByUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const session = mongoose.startSession();
  (await session).startTransaction();
  try {
    const { userId } = req.params;
    const user = req.user;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user._id !== userId && user.role !== "admin") {
      res.status(401).json({ message: "Unathorized" });
      return;
    }

    const yourAppointment = await Appointment.find({ user: userId });

    (await session).commitTransaction();

    res.status(200).json(yourAppointment);
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

export default getAppointmentByUser;
