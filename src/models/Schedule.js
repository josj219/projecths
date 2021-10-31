import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  doto: { type: String, required: true, trim: true, maxLength: 30 },
  status: { type: Number, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
