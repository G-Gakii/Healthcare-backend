import Joi from "joi";

const appointmentSchema = Joi.object({
  date: Joi.date().required().iso(),
});

export default appointmentSchema;
