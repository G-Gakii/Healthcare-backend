import { Router } from "express";
import ReviewProvider from "../controller/review/add.review";
import getreviewByProvider from "../controller/review/getProviderReview.review";
import editReview from "../controller/review/edit.review";
import deleteReview from "../controller/review/delete.review";
import { autheticateUser } from "../middleware/auth.middleware";
import authorizedUser from "../middleware/authorization.middleware";

const router = Router();

router.get("/review/:id", getreviewByProvider);
router.post(
  "/review",
  autheticateUser,
  authorizedUser(["user"]),
  ReviewProvider
);
router.put(
  "/review/:id",
  autheticateUser,
  authorizedUser(["user", "admin"]),
  editReview
);
router.delete(
  "/review/:id",
  autheticateUser,
  authorizedUser(["user", "admin"]),
  deleteReview
);

export default router;
