import express, { Router } from "express";
import getAllAppointment from "../controller/appointments/getAll.appointment";
import getAppointmentByUser from "../controller/appointments/getOne.appointment";
import bookAppointment from "../controller/appointments/book.appointment";
import editAppointment from "../controller/appointments/edit.appointment";
import deleteAppointment from "../controller/appointments/delete.appointment";
import { autheticateUser } from "../middleware/auth.middleware";
import authorizedUser from "../middleware/authorization.middleware";

const router = Router();

router.get(
  "/appointment",
  autheticateUser,
  authorizedUser(["admin"]),
  getAllAppointment
);
router.get(
  "/appointment/:id",
  autheticateUser,
  authorizedUser(["admin", "user"]),
  getAppointmentByUser
);
router.post(
  "/appointment",
  autheticateUser,
  authorizedUser(["user"]),
  bookAppointment
);
router.put(
  "/appointment/:id",
  autheticateUser,
  authorizedUser(["admin", "user"]),
  editAppointment
);
router.delete(
  "/appointment/:id",
  autheticateUser,
  authorizedUser(["user", "admin"]),
  deleteAppointment
);

export default router;
