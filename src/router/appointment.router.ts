import express, { Router } from "express";
import getAllAppointment from "../controller/appointments/getAll.appointment";
import getAppointmentByUser from "../controller/appointments/getOne.appointment";
import bookAppointment from "../controller/appointments/book.appointment";
import editAppointment from "../controller/appointments/edit.appointment";
import deleteAppointment from "../controller/appointments/delete.appointment";
import { autheticateUser } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/appointment",
  autheticateUser,

  getAllAppointment
);
router.get(
  "/appointment/personal",
  autheticateUser,

  getAppointmentByUser
);
router.post(
  "/appointment/:providerId",
  autheticateUser,

  bookAppointment
);
router.put(
  "/appointment/:id",
  autheticateUser,

  editAppointment
);
router.delete(
  "/appointment/:id",
  autheticateUser,

  deleteAppointment
);

export default router;
