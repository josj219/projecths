import express from "express";
import {
  scheduleHome,
  write,
  check,
  cancel,
  remove,
} from "../controllers/scheduleController";
import { publicOnlyMiddleware, scheduleUpload } from "../middlewares";

const scheduleRouter = express.Router();

scheduleRouter
  .route("/")
  .get(scheduleHome)
  .post(scheduleUpload.single("schedule"), write);
scheduleRouter.get("/:id([0-9a-f]{24})/check", check);
scheduleRouter.get("/:id([0-9a-f]{24})/cancel", cancel);
scheduleRouter.get("/:id([0-9a-f]{24})/remove", remove);

export default scheduleRouter;
