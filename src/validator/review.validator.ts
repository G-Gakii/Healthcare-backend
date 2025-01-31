import Joi from "joi";

const reviewSchema = Joi.object({
  provider: Joi.string().required(),
  user: Joi.string().required(),
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().max(300),
});

export default reviewSchema;
