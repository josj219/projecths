import multer from "multer";
import multers3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const multerUploader = multers3({
  s3: s3,
  bucket: "projecths",
  acl: "public-read",
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "HS";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const videoUpload = multer({
  dest: "uploads/videos/",
  storage: multerUploader,
});

export const photoUpload = multer({
  dest: "uploads/gallery/",
  limits: {
    fileSize: 10000000,
  },
  storage: multerUploader,
});

export const reviewUpload = multer({
  dest: "uploads/reviews/",
  storage: multerUploader,
});

export const scheduleUpload = multer({
  dest: "uploads/schedule/",
  limits: {
    fileSize: 10000000,
  },
});
