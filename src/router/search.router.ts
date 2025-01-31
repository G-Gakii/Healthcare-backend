import { Router } from "express";
import nearestProvider from "../controller/search.controller";

const router = Router();

router.get("/providers/nearest", nearestProvider);

export default router;
