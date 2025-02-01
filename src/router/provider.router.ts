import express from "express";
import getProviders from "../controller/providers/get.providers";
import addProviders from "../controller/providers/add.providers";
import editProvider from "../controller/providers/edit.providers";
import deleteProvider from "../controller/providers/delete.providers";
import { autheticateUser } from "../middleware/auth.middleware";
import authorizedUser from "../middleware/authorization.middleware";

const router = express.Router();

router.get("/providers", getProviders);
router.post(
  "/providers",
  autheticateUser,
  authorizedUser(["admin"]),
  addProviders
);
router.put(
  "/providers/:id",
  autheticateUser,
  authorizedUser(["admin"]),
  editProvider
);
router.delete(
  "/providers/:id",
  autheticateUser,
  authorizedUser(["admin"]),
  deleteProvider
);

export default router;
