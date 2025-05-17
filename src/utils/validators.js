import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `"name" is required`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `"email" is required`,
    "string.email": `"email" must be a valid email`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": `"password" is required`,
    "string.min": `"password" should have a minimum length of {#limit}`,
  }),
  progress: Joi.array().items(Joi.string()).optional(),
  streak: Joi.object({
    current: Joi.number().min(0).required(),
    lastUpdate: Joi.date().required(),
  }).optional(),

  achievements: Joi.array().items(Joi.string()).optional(),
});
