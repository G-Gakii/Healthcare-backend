import express from "express";
import getProviders from "../controller/providers/get.providers";
import addProviders from "../controller/providers/add.providers";
import editProvider from "../controller/providers/edit.providers";
import deleteProvider from "../controller/providers/delete.providers";
import { autheticateUser } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/providers", getProviders);
router.post(
  "/providers",
  autheticateUser,

  addProviders
);
router.put(
  "/providers/:id",
  autheticateUser,

  editProvider
);
router.delete(
  "/providers/:id",
  autheticateUser,

  deleteProvider
);

export default router;
