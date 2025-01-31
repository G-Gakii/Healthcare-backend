import { Request, Response } from "express";
import mongoose from "mongoose";
import appointmentSchema from "../../validator/appointment.validator";
import Appointment from "../../models/appointment.models";

const editAppointment = async (req: Request, res: Response) => {
  const session = mongoose.startSession();
  (await session).startTransaction();
  try {
    const { id } = req.params;
    const appointment = await appointmentSchema.validateAsync(req.body);
    const yourAppointment = await Appointment.findByIdAndUpdate(
      id,
      appointment
    );
    if (!yourAppointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
    (await session).commitTransaction();

    res
      .status(200)
      .json({ message: "Updated successfully " + yourAppointment });
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
