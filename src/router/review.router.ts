import { Router } from "express";
import ReviewProvider from "../controller/review/add.review";
import getreviewByProvider from "../controller/review/getProviderReview.review";
import editReview from "../controller/review/edit.review";
import deleteReview from "../controller/review/delete.review";

const router = Router();

router.get("/review/:id", getreviewByProvider);
router.post("/review", ReviewProvider);
router.put("/review/:id", editReview);
router.delete("/review/:id", deleteReview);

export default router;
