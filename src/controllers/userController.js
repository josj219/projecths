import User from "../models/User";
import Video from "../models/Video";
import Photo from "../models/Photo";
import Schedule from "../models/Schedule";
import Review from "../models/Review";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, location } = req.body;
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/login");
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  // console.log(username);
  const user = await User.findOne({ username });
  if (!user) {
    console.log(user);
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }

  //    const ok = await bcrypt.compare(password, user.password);
  if (password !== user.password) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, username, location },
    file,
  } = req;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("edit");
};

export const getChangePassword = (req, res) => {
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassWord, newPassword, newPasswordConfirmation },
  } = req;
  const user = await User.findById(_id);

  if (oldPassWord !== user.password) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Ther Current password is incorrect",
    });
  }

  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password does not match the confirmation",
    });
  }
  user.password = newPassword;
  await user.save();
  return res.redirect("/users/logout");
};

export const see = async (req, res) => {
  console.log("see users");
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found." });
  }
  const videos = await Video.find({ owner: user._id });
  return res.render("users/profile", {
    pageTitle: user.name,
    user,
    videos,
  });
};

export const remove = (req, res) => res.send("Remove User");

export const home = async (req, res) => {
  const videoListall = await Video.find({}).sort({ when: "desc" });
  const photoListall = await Photo.find({});
  const scheduleListall = await Schedule.find({});
  const reviewListall = await Review.find({});

  //const vlen = videoListall.length;

  const scheduleListTodo = [];
  const scheduleListDid = [];
  const videoList = [];
  const photoList = [];
  const reviewList = reviewListall[1];

  for (var a in scheduleListall) {
    if (scheduleListall[a].status == 1 && scheduleListTodo.length < 3) {
      scheduleListTodo.push(scheduleListall[a].doto);
    }
    if (scheduleListall[a].status == 0 && scheduleListDid.length < 3) {
      scheduleListDid.push(scheduleListall[a].doto);
    }
  }
  if (videoListall[0]) {
    videoList.push(videoListall[0]);
  }
  if (videoListall[1]) {
    videoList.push(videoListall[1]);
  }
  if (videoListall[2]) {
    videoList.push(videoListall[2]);
  }

  if (photoListall[0]) {
    photoList.push(photoListall[0]);
  }
  if (photoListall[1]) {
    photoList.push(photoListall[1]);
  }
  if (photoListall[2]) {
    photoList.push(photoListall[2]);
  }
  if (photoListall[3]) {
    photoList.push(photoListall[3]);
  }
  return res.render("home", {
    pageTitle: "watch",
    videoList,
    photoList,
    scheduleListTodo,
    scheduleListDid,
    reviewList,
  });
};
