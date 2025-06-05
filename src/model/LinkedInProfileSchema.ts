import { Schema, model } from "mongoose";

interface ILinkedInProfile {
  followers: number;
  connections: number;
  about: string;
}

const LinkedInProfileSchema = new Schema<ILinkedInProfile>({
  followers: { type: Number, required: true },
  connections: { type: Number, required: true },
  about: { type: String, required: true },
});

export const LinkedInProfile = model<ILinkedInProfile>("LinkedInProfile", LinkedInProfileSchema);