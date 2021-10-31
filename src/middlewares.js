import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "HS";
  res.locals.loggedInUser = req.session.user || {};
  //console.log(res.locals);
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

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
});

export const photoUpload = multer({
  dest: "uploads/gallery/",
  limits: {
    fileSize: 10000000,
  },
});

export const reviewUpload = multer({
  dest: "uploads/reviews/",
  limits: {
    fileSize: 10000000,
  },
});

export const scheduleUpload = multer({
  dest: "uploads/schedule/",
  limits: {
    fileSize: 10000000,
  },
});
