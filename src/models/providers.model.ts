import { required, string } from "joi";
import mongoose from "mongoose";
import { providerType } from "../interface/provider.interface";

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  specialization: {
    type: [String],
  },
  consultation_fee: {
    type: Number,
  },
  insurance: {
    type: [String],
  },
  rate: {
    type: Number,
  },
});

ProviderSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "provider",
  justOne: false,
});

// Ensure virtual fields are serialized
ProviderSchema.set("toObject", { virtuals: true });
ProviderSchema.set("toJSON", { virtuals: true });

ProviderSchema.index({ location: "2dsphere" });

const Provider = mongoose.model<providerType>("Provider", ProviderSchema);

export default Provider;
