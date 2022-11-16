const Joi = require('joi');
const mongoose = require('mongoose')

const ShoppingListSchema = new mongoose.Schema({
    name: String,
    description: String,
    sharedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const validateShoppingList = (list) => {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        description: Joi.string().max(250).allow(null, ''),
    });
    return schema.validate(list);
}

exports.ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);
exports.validate = validateShoppingList;