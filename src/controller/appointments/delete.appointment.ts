import { Request, Response } from "express";
import mongoose from "mongoose";

import Appointment from "../../models/appointment.models";

const deleteAppointment = async (req: Request, res: Response) => {
  const session = mongoose.startSession();
  (await session).startTransaction();
  try {
    const { id } = req.params;

    const yourAppointment = await Appointment.findByIdAndDelete(id);
    if (!yourAppointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
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
