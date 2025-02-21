import { Request, Response } from "express";
import mongoose from "mongoose";
import appointmentSchema from "../../validator/appointment.validator";
import Appointment from "../../models/appointment.models";
import { AuthenticatedRequest } from "../../interface/auth.interface";
import { log } from "console";
import sendMail from "../../utilils/email";
import Provider from "../../models/providers.model";

const bookAppointment = async (req: AuthenticatedRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { providerId } = req.params;

    const appointment = await appointmentSchema.validateAsync(req.body);

    const user = req.user;
    if (!user) {
      res.status(404).json({ message: "user is not found" });
      return;
    }

    const newAppointment = new Appointment({
      ...appointment,
      user: user._id,
      provider: providerId,
    });

    const myAppointment = await newAppointment.save({ session });
    const provider = await Provider.findById(providerId);
    if (!provider) {
      res.status(404).json({ message: "Provider not found" });
      return;
    }
    const { name } = provider;
    session.commitTransaction();
    await sendMail(
      user.email,
      "Appointment",
      `You have booked appointment on ${myAppointment.date} at ${name} facility `
    );

    res.status(201).json(myAppointment);
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

export default bookAppointment;
