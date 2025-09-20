import mongoose, { Schema, Document } from 'mongoose';

export interface IUserToken extends Document {
  userId: string;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  location?: string;
  org?: string;
  postalCode?: string;
  timezone?: string;
  firstVisit: Date;
  lastVisit: Date;
  visitCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserTokenSchema: Schema = new Schema(
  {
    userId: { 
      type: String, 
      required: true, 
      unique: true,
      index: true 
    },
    ip: { type: String, required: true },
    city: String,
    region: String,
    country: String,
    location: String,
    org: String,
    postalCode: String,
    timezone: String,
    firstVisit: { type: Date, default: Date.now },
    lastVisit: { type: Date, default: Date.now },
    visitCount: { type: Number, default: 1 }
  },
  { timestamps: true }
);

const UserToken = mongoose.models.UserToken || mongoose.model<IUserToken>('UserToken', UserTokenSchema);

export default UserToken;
