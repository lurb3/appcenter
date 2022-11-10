import Joi from 'joi';

const addProductSchema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  price: Joi.number().min(1).max(9999).allow(null, ''),
  quantity: Joi.number().min(1).max(9999).allow(null, ''),
  productLink: Joi.string().uri().min(5).max(255).allow(null, ''),
  notes: Joi.string().min(5).max(1000).allow(null, ''),
});

export { addProductSchema };
