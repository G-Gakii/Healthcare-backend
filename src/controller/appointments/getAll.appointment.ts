import { Request, Response } from "express";
import mongoose from "mongoose";
import appointmentSchema from "../../validator/appointment.validator";
import Appointment from "../../models/appointment.models";

const getAllAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.find({});

    res.status(200).json(appointment);
    return;
  } catch (error) {
    const err = error as Error;

    res.status(500).json({ message: err.message });
    return;
  }
};

export default getAllAppointment;
