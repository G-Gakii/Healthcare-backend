import Joi from "joi";
import { UserInterface } from "../interface/user.interface";

const validateUser = (user: UserInterface) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    role: Joi.string().valid("admin", "user").required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });
  return schema.validate(user);
};

export default validateUser;
