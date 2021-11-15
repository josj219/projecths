import express from "express";
import { home, getLogin, postLogin } from "../controllers/userController";
import { search } from "../controllers/videoController";
import { protectorMiddleware } from "../middlewares";

const globalRouter = express.Router();

globalRouter.route("/").all(protectorMiddleware).get(home);
globalRouter.route("/login").get(getLogin).post(postLogin);
//globalRouter.get("/search", search);

export default globalRouter;
