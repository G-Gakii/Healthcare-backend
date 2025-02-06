import { Router } from "express";
import nearestProvider from "../controller/search.controller";

const router = Router();

router.post("/providers/nearest", nearestProvider);

export default router;
