import Joi from "joi";

const providerSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().min(2).max(60).required(),
    address: Joi.string().allow(null, ""),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
    specilization: Joi.array().items(Joi.string()).required(),
    consultation_fee: Joi.number().required(),
    insurance: Joi.array().items(Joi.string()).allow(null, ""),
    rating: Joi.number().default(0),
  })
);

export const singleProviderSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  address: Joi.string().allow(null, ""),
  coordinates: Joi.array().items(Joi.number()).length(2).required(),
  specilization: Joi.array().items(Joi.string()).required(),
  consultation_fee: Joi.number().required(),
  insurance: Joi.array().items(Joi.string()).allow(null, ""),
  rating: Joi.number().default(0),
});

export default providerSchema;
