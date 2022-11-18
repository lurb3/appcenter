import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().trim().min(5).required(),
});

export { loginSchema };
