import Joi from "joi";

const appointmentSchema = Joi.object({
  provider: Joi.string().required(),

  date: Joi.date().required().iso(),
});

export default appointmentSchema;
