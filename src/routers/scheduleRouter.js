import express from "express";
import {
  scheduleHome,
  write,
  check,
  cancel,
  remove,
} from "../controllers/scheduleController";
import { protectorMiddleware, scheduleUpload } from "../middlewares";

const scheduleRouter = express.Router();

scheduleRouter
  .route("/")
  .all(protectorMiddleware)
  .get(scheduleHome)
  .post(scheduleUpload.single("schedule"), write);
scheduleRouter
  .route("/:id([0-9a-f]{24})/check")
  .all(protectorMiddleware)
  .get(check);
scheduleRouter
  .route("/:id([0-9a-f]{24})/cancel")
  .all(protectorMiddleware)
  .get(cancel);
scheduleRouter
  .route("/:id([0-9a-f]{24})/remove")
  .all(protectorMiddleware)
  .get(remove);

export default scheduleRouter;
