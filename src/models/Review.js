import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  movieName: { type: String, required: true, trim: true, maxLength: 20 },
  fileUrl: { type: String, required: true },
  hashtags: [{ type: String, trim: true }],
  bang_comment: { type: String, required: true, trim: true },
  bang_score: { type: Number, required: true },
  jo_comment: { type: String, required: true, trim: true },
  jo_score: { type: Number, required: true },
  avg_score: {type:Number, default:0}
});


const Review = mongoose.model("Review", reviewSchema);
export default Review;
