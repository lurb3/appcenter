require('dotenv').config();
const { ShoppingList, validate } = require('../models/ShoppingList');

const AddShoppingList = async (req, res) => {
    const { error } = validate(req.body);
    const { name } = req.body

    if (! req.userId) return res.status(401).send({ message: 'User not found' });

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let shoppingList = await ShoppingList.findOne({ name: name, userId: req.userId });

    if (shoppingList) {
        return res.status(400).send({ message: 'You already own that list' });
    }

    shoppingList = new ShoppingList({
        name: name,
        userId: req.userId
    });

    await shoppingList.save();

    res.send(shoppingList);
}

module.exports = { AddShoppingList };