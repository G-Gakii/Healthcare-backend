import express from "express";
import getProviders from "../controller/providers/get.providers";
import addProviders from "../controller/providers/add.providers";
import editProvider from "../controller/providers/edit.providers";
import deleteProvider from "../controller/providers/delete.providers";
import { autheticateUser } from "../middleware/auth.middleware";
import getSingleProvider from "../controller/providers/getOneprovider";

const router = express.Router();

router.get("/", getProviders);
router.get("/:id", getSingleProvider);
router.post(
  "/",
  autheticateUser,

  addProviders
);

router.put(
  "/:id",
  autheticateUser,

  editProvider
);
router.delete(
  "/:id",
  autheticateUser,

  deleteProvider
);

export default router;
