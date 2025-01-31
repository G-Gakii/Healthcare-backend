import express, { Router } from "express";
import getAllAppointment from "../controller/appointments/getAll.appointment";
import getAppointmentByUser from "../controller/appointments/getOne.appointment";
import bookAppointment from "../controller/appointments/book.appointment";
import editAppointment from "../controller/appointments/edit.appointment";
import deleteAppointment from "../controller/appointments/delete.appointment";

const router = Router();

router.get("/appointment", getAllAppointment);
router.get("/appointment/:id", getAppointmentByUser);
router.post("/appointment", bookAppointment);
router.put("/appointment/:id", editAppointment);
router.delete("/appointment/:id", deleteAppointment);

export default router;
