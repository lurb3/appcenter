require('dotenv').config();
const { ShoppingList, validate } = require('../models/ShoppingList');
const { Product } = require('../models/Product');

const AddShoppingList = async (req, res) => {
    const { error } = validate(req.body);
    const { name, description } = req.body;

    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    let shoppingList = await ShoppingList.findOne({ name: name.toLowerCase(), userId: req.userId });

    if (shoppingList) {
        return res.status(400).send({ message: 'You already own that shopping list' });
    }

    shoppingList = new ShoppingList({
        name: name.toLowerCase(),
        description: description,
        userId: req.userId
    });

    await shoppingList.save();

    res.send(shoppingList);
}

const GetAllUserShoppingLists = async (req, res) => {
    let shoppingList = await ShoppingList.find({ userId: req.userId });

    if (! shoppingList) return res.status(404).send({ message: 'Shopping list not found' });

    return res.send(shoppingList);
}

const GetUserShoppingList = async (req, res) => {
    let shoppingList = await ShoppingList.findOne({ _id: req.params.shoppingListId });

    if (! shoppingList) return res.status(404).send({ message: 'Shopping list not found' });

    return res.send(shoppingList);
}

const DeleteShoppingList = async (req, res) => {
    await Product.deleteMany({ shoppingListId: req.params.shoppingListId });
    let shoppingListToDelete = await ShoppingList.deleteOne({ _id: req.params.shoppingListId });

    if (shoppingListToDelete.deletedCount > 0) {
        return res.send({ message: "Shopping list deleted successfully" });
    }

    return res.status(404).send({ message: 'Shopping list not found' });
}

const DeleteAllShoppingLists = async (req, res) => {
    let shoppingLists = await ShoppingList.find({ userId: req.userId });

    if (! shoppingLists) return res.status(404).send({ message: 'Products not found' });

    const products = await Product.deleteMany({shoppingListId: shoppingLists})
    shoppingLists = await ShoppingList.deleteMany({ userId: req.userId });

    if (shoppingLists.deletedCount <= 0) {
        return res.send({ message: `No shopping list to delete` });
    }

    return res.send({ message: `Successfully deleted ${shoppingLists.deletedCount} shopping list(s) and ${products.deletedCount} product(s)` });
}

module.exports = { AddShoppingList, GetAllUserShoppingLists, GetUserShoppingList, DeleteShoppingList, DeleteAllShoppingLists };