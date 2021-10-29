import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],

});


// userSchema.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 5);
//   });

const User = mongoose.model("User", userSchema);
export default User;
