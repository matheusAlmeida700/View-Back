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
});

export const universeSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  position: Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),
  }).required(),
  dimensions: Joi.object({
    width: Joi.number().required(),
    height: Joi.number().required(),
  }).required(),
  color: Joi.string().default("hsl(0, 0%, 80%)"),
  opacity: Joi.number().default(0.75),
});

export const categorySchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  universeId: Joi.string().required(),
  offsetX: Joi.number().required(),
  width: Joi.number().required(),
  minWidth: Joi.number().required(),
  maxWidth: Joi.number().required(),
  color: Joi.string().default("hsl(0, 0%, 80%)"),
  locked: Joi.boolean().default(false),
  opacity: Joi.number().default(0.9),
});

export const pharmacySchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  storeSize: Joi.string().valid("P", "M", "G").default("G"),
  scalePixelsPerMeter: Joi.number().default(12),
  dimensions: Joi.object({
    width: Joi.number().required(),
    height: Joi.number().required(),
  }).required(),
  universes: Joi.array().items(universeSchema).min(1),
  categories: Joi.array().items(categorySchema).min(1),
});
