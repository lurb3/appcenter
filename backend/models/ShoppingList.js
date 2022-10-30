const Joi = require('joi');
const mongoose = require('mongoose')

const ShoppingListSchema = new mongoose.Schema({
    name: String,
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const validateShoppingList = (list) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(250),
    });
    return schema.validate(list);
}

exports.ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);
exports.validate = validateShoppingList;