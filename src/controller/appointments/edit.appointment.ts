import { Request, Response } from "express";
import mongoose from "mongoose";
import appointmentSchema from "../../validator/appointment.validator";
import Appointment from "../../models/appointment.models";
import { AuthenticatedRequest } from "../../interface/auth.interface";

const editAppointment = async (req: AuthenticatedRequest, res: Response) => {
  const session = mongoose.startSession();
  (await session).startTransaction();
  try {
    const { id } = req.params;
    const appointment = await appointmentSchema.validateAsync(req.body);
    const user = req.user;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const yourAppointment = await Appointment.findById(id);

    if (!yourAppointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
    if (
      yourAppointment.user.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      res.status(401).json({ message: "Unathorized to edit appointment" });
      return;
    }
    const myAppointment = await Appointment.findByIdAndUpdate(id, {
      ...appointment,
      user: user._id,
    });
    (await session).commitTransaction();

    res
      .status(200)
      .json({ message: "Updated successfully ", appointment: myAppointment });
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
