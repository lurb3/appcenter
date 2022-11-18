import Joi from 'joi';

const addShoppingListSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().allow(null, ''),
});

export { addShoppingListSchema };
