import Joi from 'joi';

const signupSchema = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required(),
});

export { signupSchema };
