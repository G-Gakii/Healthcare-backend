import { required } from "joi";
import mongoose from "mongoose";
import { providerType } from "../interface/provider.interface";

const ProviderSchema = new mongoose.Schema({
  name: {
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
ProviderSchema.index({ location: "2dsphere" });

const Provider = mongoose.model<providerType>("Provider", ProviderSchema);

export default Provider;
