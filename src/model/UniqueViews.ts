import mongoose from "mongoose";

const uniqueViewsSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Use existing model if it exists, otherwise define a new one
const UniqueViews = mongoose.models.UniqueViews || mongoose.model("UniqueViews", uniqueViewsSchema);

export default UniqueViews;
