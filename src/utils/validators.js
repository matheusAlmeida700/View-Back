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
    current: Joi.number().min(0),
    lastUpdate: Joi.date(),
  }).optional(),
  xp: Joi.number().default(0),
  achievements: Joi.array().items(Joi.string()).optional(),
});

export const postSchema = Joi.object({
  userId: Joi.string().required(),
  category: Joi.string()
    .valid(
      "algebra",
      "aritmetica",
      "geometria",
      "estatistica",
      "funcoes",
      "outros"
    )
    .required(),

  content: Joi.string().max(600).required(),

  answers: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().max(500).required(),
        author: Joi.string().default("Anônimo"),
      })
    )
    .default([]),
});

export const answerSchema = Joi.object({
  text: Joi.string().max(500).required(),
  userId: Joi.string().required(),
});
