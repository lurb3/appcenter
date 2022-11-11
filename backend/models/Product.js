const Joi = require('joi');
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    productLink: String,
    notes: String,
    priority: {type: String, default: 'Medium'},
    shoppingListId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingList' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const validateProduct = (list) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        price: Joi.number().min(1).max(9999).allow(null, ''),
        quantity: Joi.number().min(1).max(9999).allow(null, ''),
        productLink: Joi.string().uri().min(5).max(255).allow(null, ''),
        notes: Joi.string().min(5).max(1000).allow(null, ''),
        priority: Joi.string().valid('Very high', 'High', 'Medium', 'Low', 'Very low')
    });
    return schema.validate(list);
}

exports.Product = mongoose.model('Product', ProductSchema);
exports.validate = validateProduct;