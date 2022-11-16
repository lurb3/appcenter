import Joi from 'joi';

const addProductSchema = Joi.object({
  name: Joi.string().max(50).required(),
  price: Joi.number().min(1).max(9999).allow(null, ''),
  quantity: Joi.number().min(1).max(9999).allow(null, ''),
  productLink: Joi.string().uri().max(255).allow(null, ''),
  notes: Joi.string().max(1000).allow(null, ''),
  priority: Joi.number().min(0).max(4).allow(null, ''),
});

export { addProductSchema };
