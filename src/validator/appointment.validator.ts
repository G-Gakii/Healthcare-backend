import Joi from "joi";

const appointmentSchema = Joi.object({
  provider: Joi.string().required(),
  user: Joi.string().required(),
  date: Joi.date().required().iso(),
});

export default appointmentSchema;
