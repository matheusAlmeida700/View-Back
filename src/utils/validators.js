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
  shelfRows: Joi.number().default(0),
  rowHeightM: Joi.number().default(0),
  color: Joi.string().default("hsl(0, 0%, 80%)"),
  opacity: Joi.number().default(0.75),
});

export const categorySchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  universeId: Joi.string().required(),
  row: Joi.number().default(0),
  offsetX: Joi.number().required(),
  offsetY: Joi.number().default(0),
  width: Joi.number().required(),
  minWidth: Joi.number().default(0.5),
  maxWidth: Joi.number().default(10),
  color: Joi.string().default("hsl(0, 0%, 80%)"),
  locked: Joi.boolean().default(false),
  opacity: Joi.number().default(0.9),
  labelPosition: Joi.string().valid("top", "bottom", "center").default("top"),
  meta: Joi.object().default({}),
});

export const pharmacySchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  storeSize: Joi.string().valid("P", "M", "G").required(),
  scalePixelsPerMeter: Joi.number().default(12),
  dimensions: Joi.object({
    width: Joi.number().required(),
    height: Joi.number().required(),
  }).required(),
  universes: Joi.array().items(universeSchema).min(1).required(),
  categories: Joi.array().items(categorySchema).min(1).required(),
});
