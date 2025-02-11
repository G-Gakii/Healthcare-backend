import Joi from "joi";

const reviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().max(300),
});

export default reviewSchema;
