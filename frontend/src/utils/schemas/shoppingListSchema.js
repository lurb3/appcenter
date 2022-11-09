import Joi from 'joi';

const addShoppingListSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null, ''),
});

export { addShoppingListSchema };
