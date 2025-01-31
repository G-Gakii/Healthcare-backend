import { Request, Response } from "express";
import mongoose from "mongoose";
import appointmentSchema from "../../validator/appointment.validator";
import Appointment from "../../models/appointment.models";

const bookAppointment = async (req: Request, res: Response) => {
  const session = mongoose.startSession();
  (await session).startTransaction();
  try {
    const appointment = await appointmentSchema.validateAsync(req.body);
    const newAppointment = new Appointment(appointment);
    const myAppointment = await newAppointment.save();
    (await session).commitTransaction();

    res.status(201).json(myAppointment);
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

export default bookAppointment;
