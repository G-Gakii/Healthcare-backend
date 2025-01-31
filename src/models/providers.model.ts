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

  coordinates: {
    type: [Number],
    required: true,
  },

  specilization: {
    type: [String],
  },
  consultation_fee: {
    type: Number,
  },
  insurance: {
    type: [String],
  },
  rating: {
    type: Number,
  },
});

const Provider = mongoose.model<providerType>("Provider", ProviderSchema);

export default Provider;
