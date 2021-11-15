import Review from "../models/Review";
//import User from "../models/User";

export const reviewHome = async (req, res) => {
  const reviewList = await Review.find({});
  console.log(reviewList);
  return res.render("reviews/reviewList", { pageTitle: "Review", reviewList });
};

export const getUploadReview = (req, res) => {
  return res.render("reviews/upload", { pageTitle: "Upload Photo" });
};

export const postUploadReview = async (req, res) => {
  const { path: fileUrl } = req.file;
  const {
    movieName,
    hashtags,
    bang_score,
    bang_comment,
    jo_score,
    jo_comment,
  } = req.body;

  try {
    const avg = (parseFloat(bang_score) + parseFloat(jo_score)) / 2;
    const avg_score = Math.round(avg * 100) / 100;

    const newReview = await Review.create({
      movieName,
      fileUrl,
      hashtags: Review.formatHashtags(hashtags),
      bang_score,
      bang_comment,
      jo_score,
      jo_comment,
      avg_score,
    });
    console.log(newReview);
    return res.redirect("/reviews");
  } catch (error) {
    console.log(error);
    return res.status(400).render("reviews/upload", {
      pageTitle: "Upload Review",
      errorMessage: error._message,
    });
  }
};

export const reviewWatch = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  console.log(review);
  if (!review) {
    return res.render("404", { pageTitle: "Review not found." });
  }
  return res.render("reviews/watch", { pageTitle: "reviewWatch", review });
};

// galleryHome,postEditGallery,getEditGallery,,galleryWatch

// Model 필요 -> Upload - 할 때 DB 로 업로드 되도록 -> upload 폴더 내 디렉토리 생성

//////////////////////////////////////////////////////////////////////////////////

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id);
  if (!review) {
    return res.status(404).render("404", { pageTitle: "Review not found." });
  }
  await Review.findByIdAndDelete(id);
  return res.redirect("/");
};
