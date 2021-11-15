import express from "express";
import {
  galleryHome,
  postEditGallery,
  getEditGallery,
  postUploadGallery,
  getUploadGallery,
  deleteGallery,
  galleryWatch,
} from "../controllers/galleryController";
import {
  publicOnlyMiddleware,
  protectorMiddleware,
  photoUpload,
} from "../middlewares";
// protector all 로 해서 넣으면 된다... 나중에 로그인 한 놈만 접근하게 하려면

const galleryRouter = express.Router();

galleryRouter.route("/").all(protectorMiddleware).get(galleryHome);
galleryRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUploadGallery)
  .post(photoUpload.single("photo"), postUploadGallery);
galleryRouter
  .route("/:id([0-9a-f]{24})")
  .all(protectorMiddleware)
  .get(galleryWatch);

//post(videoUpload.single("video"), postUpload);
// galleryRouter.route("/:id([0-9a-f]{24})/edit").get(getEditGallery).post(postEditGallery);
// galleryRouter.route("/:id([0-9a-f]{24})/delete").post(deleteGallery);

export default galleryRouter;
