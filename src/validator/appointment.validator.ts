import Joi from "joi";

const appointmentSchema = Joi.object({
  provider: Joi.string().required(),
  user: Joi.string().required(),
  date: Joi.date().required().iso(),
  time: Joi.string()
    .pattern(/^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/)
    .required(),
});

export default appointmentSchema;
