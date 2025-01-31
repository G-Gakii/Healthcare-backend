import { Request, Response } from "express";
import mongoose from "mongoose";
import appointmentSchema from "../../validator/appointment.validator";
import Appointment from "../../models/appointment.models";

const editAppointment = async (req: Request, res: Response) => {
  const session = mongoose.startSession();
  (await session).startTransaction();
  try {
    const { userId } = req.params;

    const yourAppointment = await Appointment.find({ user: userId });
    if (!yourAppointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
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

export default editAppointment;
