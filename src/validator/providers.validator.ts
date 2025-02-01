import Joi from "joi";

const providerSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().min(2).max(60).required(),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    address: Joi.string().allow(null, ""),
    location: Joi.object({
      type: Joi.string().valid("Point").required(),
      coordinates: Joi.array()
        .items(Joi.number().min(-180).max(180))
        .length(2)
        .required(),
    }).required(),

    specialization: Joi.array().items(Joi.string()).required(),
    consultation_fee: Joi.number().required(),
    insurance: Joi.array().items(Joi.string()).allow(null, ""),
    rating: Joi.number().default(0),
  })
);

export const singleProviderSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  address: Joi.string().allow(null, ""),
  location: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array()
      .items(Joi.number().min(-180).max(180))
      .length(2)
      .required(),
  }).required(),

  specialization: Joi.array().items(Joi.string()).required(),
  consultation_fee: Joi.number().required(),
  insurance: Joi.array().items(Joi.string()).allow(null, ""),
  rating: Joi.number().default(0),
});

export default providerSchema;
