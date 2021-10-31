import express from "express";
import {
  reviewHome,
  postUploadReview,
  getUploadReview,
  deleteReview,
  reviewWatch,
} from "../controllers/reviewController";
import { publicOnlyMiddleware, reviewUpload } from "../middlewares";

const reviewRouter = express.Router();

reviewRouter.get("/", reviewHome);
reviewRouter.get("/:id([0-9a-f]{24})", reviewWatch);
reviewRouter.route("/:id([0-9a-f]{24})/delete").post(deleteReview);
reviewRouter
  .route("/upload")
  .get(getUploadReview)
  .post(reviewUpload.single("review"), postUploadReview);

export default reviewRouter;
