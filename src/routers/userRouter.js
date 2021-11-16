import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);

userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

// userRouter.get("/:id", see);

export default userRouter;
