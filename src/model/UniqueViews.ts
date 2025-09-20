import mongoose from "mongoose";
const uniqueViewsSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    userId: { type: String, required: true, unique: true, index: true },
    city: String,
    region: String,
    country: String,
    location: String,
    org: String,
    postalCode: String,
    timezone: String,
  },
  { timestamps: true }
);

const UniqueViews = mongoose.models.UniqueViews || mongoose.model("UniqueViews", uniqueViewsSchema);

export default UniqueViews;
