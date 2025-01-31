import { Request, Response } from "express";
import mongoose from "mongoose";

import Appointment from "../../models/appointment.models";
import { AuthenticatedRequest } from "../../interface/auth.interface";

const deleteAppointment = async (req: AuthenticatedRequest, res: Response) => {
  const session = mongoose.startSession();
  (await session).startTransaction();
  try {
    const { id } = req.params;
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
      yourAppointment.user.toString() !== user?._id.toString() &&
      user.role !== "admin"
    ) {
      res.status(401).json({ message: "Unathorized" });
      return;
    }

    await Appointment.findByIdAndDelete(id);
    (await session).commitTransaction();

    res.status(200).json({ message: "Deleted successfully" });
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

export default deleteAppointment;
