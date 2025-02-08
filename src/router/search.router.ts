import { Router } from "express";
import nearestProvider from "../controller/search.controller";

const router = Router();

router.get(
  "/providers/nearest/:latitude/:longitude/:specialization",
  nearestProvider
);

export default router;
