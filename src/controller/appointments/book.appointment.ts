import { Request, Response } from "express";
import mongoose from "mongoose";
import appointmentSchema from "../../validator/appointment.validator";
import Appointment from "../../models/appointment.models";
import { AuthenticatedRequest } from "../../interface/auth.interface";
import { log } from "console";

const bookAppointment = async (req: AuthenticatedRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { providerId } = req.params;
    console.log(providerId);

    const appointment = await appointmentSchema.validateAsync(req.body);
    const user = req.user;
    if (!user) {
      res.status(404).json({ message: "user is not found" });
      return;
    }
    console.log(providerId);
    console.log(appointment);
    console.log(user);

    const newAppointment = new Appointment({
      ...appointment,
      user: user._id,
      provider: providerId,
    });

    const myAppointment = await newAppointment.save({ session });
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
