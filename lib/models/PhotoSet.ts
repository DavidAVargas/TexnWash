import { model, models, Schema } from "mongoose";

export interface IPhotoSet {
  _id: string;
  customerEmail: string;
  customerName: string;
  address?: string;
  jobDate: Date;
  serviceType: string;
  notes?: string;
  beforePhotos: string[];
  afterPhotos: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PhotoSetSchema = new Schema<IPhotoSet>(
  {
    customerEmail: { type: String, required: true, index: true },
    customerName: { type: String, required: true },
    address: { type: String },
    jobDate: { type: Date, required: true },
    serviceType: { type: String, required: true },
    notes: { type: String },
    beforePhotos: [{ type: String }],
    afterPhotos: [{ type: String }],
  },
  { timestamps: true }
);

export const PhotoSet = models.PhotoSet ?? model<IPhotoSet>("PhotoSet", PhotoSetSchema);
