import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const videoHome = async (req, res) => {
  const videoList = await Video.find({}).sort({ when: "desc" });
  return res.render("videos/videoList", { pageTitle: "videos", videoList });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("videos/watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("videos/edit", {
    pageTitle: `Edit ${video.title},`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { location: fileUrl } = req.file;
  const { title, when, description, hashtags } = req.body;

  const uploadDate = new Date().toDateString();
  const whenDate = when;
  console.log(typeof when);
  console.log(when);
  console.log(when.substring(2, 10));

  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      when: whenDate,
      owner: _id,
      createdAt: uploadDate,
      hashtags: Video.formatHashtags(hashtags),
      meta: {
        views: 0,
        rating: 0,
      },
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    //console.log(newVideo);
    return res.redirect("/videos");
  } catch (error) {
    console.log(error);
    return res.status(400).render("videos/upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    // const suser = await User.find({});
    // console.log(suser);
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    owner_name: user.name,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();
  // console.log(user);
  console.log(comment.owner_name);

  return res
    .status(201)
    .json({ newCommentId: comment._id, owner_name: comment.owner_name });
};

export const deleteComment = async (req, res) => {
  console.log(req);
  const {
    session: { user },
    body: { videoId, commentId },
  } = req;
  const video = await Video.findById(videoId);
  if (!video) {
    return res.sendStatus(404);
  }
  const commenDelSuccess = await Comment.deleteOne({
    _id: commentId,
    video: video.id,
  });
  console.log(commenDelSuccess);
  video.comments.pull(commentId);
  video.save();
  return res.sendStatus(200);
};
