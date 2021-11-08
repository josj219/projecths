import express from "express";
import { home, getLogin, postLogin } from "../controllers/userController";
import { search } from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
globalRouter.get("/search", search);

export default globalRouter;
