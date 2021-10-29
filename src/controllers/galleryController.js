import Photo from "../models/Photo";
//import User from "../models/User";

export const galleryHome = async(req, res) => 
{
    const photoList = await Photo.find({}).sort({ createdAt: "desc" });;
    return res.render("gallery/photoList", { pageTitle: "watch", photoList });      
}

export const getUploadGallery = (req,res) =>
{
    return res.render("gallery/upload", { pageTitle: "Upload Photo" });

}

export const postUploadGallery = async (req,res) =>
{
    const {
        user: { _id },
      } = req.session;
      const { path: fileUrl } = req.file;
      const { title, description, hashtags } = req.body;
      
      try{
        const newPhoto = await Photo.create({
          title,
          description,
          fileUrl,
          owner: _id,
          createdAt:123,
          hashtags: Photo.formatHashtags(hashtags),
          meta: {
            views: 0,
            rating: 0,
          },
        });
        const user = await User.findById(_id);
        user.photos.push(Photo._id);
        user.save();
        console.log(newPhoto);
        return res.redirect("/gallery");
      } catch (error) {
        return res.status(400).render("gallery/upload", {
          pageTitle: "Upload Video",
          errorMessage: error._message,
        });
      }
}


export const galleryWatch = async (req,res) => {
    const { id } = req.params;
    const photo = await Photo.findById(id).populate("owner");
    console.log(photo);
    if (!photo) {
      return res.render("404", { pageTitle: "Photo not found." });
    }
    return res.render("gallery/watch", { pageTitle: photo.title, photo });
}

// galleryHome,postEditGallery,getEditGallery,,galleryWatch

// Model 필요 -> Upload - 할 때 DB 로 업로드 되도록 -> upload 폴더 내 디렉토리 생성

//////////////////////////////////////////////////////////////////////////////////

export const watch = async (req,res) => {
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner");
    console.log(video);
    if (!video) {
      return res.render("404", { pageTitle: "Video not found." });
    }
    return res.render("videos/watch", { pageTitle: video.title, video });
}

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
    return res.render("videos/edit", { pageTitle: `Edit ${video.title},`,video });
}

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if(!video){
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id,{
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
    const { path: fileUrl } = req.file;
    const { title, description, hashtags } = req.body;
    
    try{
      const newVideo = await Video.create({
        title,
        description,
        fileUrl,
        owner: _id,
        createdAt:123,
        hashtags: Video.formatHashtags(hashtags),
        meta: {
          views: 0,
          rating: 0,
        },
      });
      const user = await User.findById(_id);
      user.videos.push(newVideo._id);
      user.save();
      console.log(newVideo);
      return res.redirect("/videos");
    } catch (error) {
      return res.status(400).render("videos/upload", {
        pageTitle: "Upload Video",
        errorMessage: error._message,
      });
    }
  };
  
  export const deleteVideo = async (req,res) =>{
    const {id} = req.params;
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
