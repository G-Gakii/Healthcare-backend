import express from "express";
import getProviders from "../controller/providers/get.providers";
import addProviders from "../controller/providers/add.providers";
import editProvider from "../controller/providers/edit.providers";
import deleteProvider from "../controller/providers/delete.providers";

const router = express.Router();

router.get("/providers", getProviders);
router.post("/providers", addProviders);
router.put("/providers/:id", editProvider);
router.delete("/providers/:id", deleteProvider);

export default router;
