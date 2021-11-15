import express from "express";
import {
  reviewHome,
  postUploadReview,
  getUploadReview,
  deleteReview,
  reviewWatch,
} from "../controllers/reviewController";
import { protectorMiddleware, reviewUpload } from "../middlewares";

const reviewRouter = express.Router();

reviewRouter.route("/").all(protectorMiddleware).get(reviewHome);
reviewRouter
  .route("/:id([0-9a-f]{24})")
  .all(protectorMiddleware)
  .get(reviewWatch);
reviewRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .post(deleteReview);
reviewRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUploadReview)
  .post(reviewUpload.single("review"), postUploadReview);

export default reviewRouter;
