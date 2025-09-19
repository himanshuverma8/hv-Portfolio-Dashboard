import mongoose from "mongoose";

const targetDateSchema = new mongoose.Schema(
  {
    targetDate: { 
      type: String, 
      required: true,
      default: "1 May 2026"
    },
    description: {
      type: String,
      default: "Target countdown date"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const TargetDate = mongoose.models.TargetDate || mongoose.model("TargetDate", targetDateSchema);

export default TargetDate;
