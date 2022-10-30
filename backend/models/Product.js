const Joi = require('joi');
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    shoppingListId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList' },
});

const validateProduct = (list) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        price: Joi.number().min(1).max(9999),
        quantity: Joi.number().min(1).max(9999)
    });
    return schema.validate(list);
}

exports.Product = mongoose.model('Product', ProductSchema);
exports.validate = validateProduct;