require('dotenv').config();
const { ShoppingList, validate } = require('../models/ShoppingList');
const { Product } = require('../models/Product');
const { User } = require('../models/User');
const Joi = require('joi');

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
    let shoppingList = await ShoppingList.find({
        $or: [
            { userId: req.userId }, { sharedUsers: { $in: [req.userId] } }
        ]
    });

    if (! shoppingList) return res.status(404).send({ message: 'Shopping list not found' });

    return res.send(shoppingList);
}

const GetUserShoppingList = async (req, res) => {
    let shoppingList = await ShoppingList.findOne({ _id: req.params.shoppingListId,
        $or: [
        { userId: req.userId }, { sharedUsers: { $in: [req.userId] } }
        ]
    });

    if (! shoppingList) return res.status(404).send({ message: 'Shopping list not found' });

    return res.send(shoppingList);
}

const UpdateShoppingList = async (req, res) => {
    const { error } = validate(req.body);

    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    let shoppingList = await ShoppingList.findOneAndUpdate({
        _id: req.params.shoppingListId,
        $or: [
            { userId: req.userId }, { sharedUsers: { $in: [req.userId] } }
        ]
    }, {$set: req.body}, {returnDocument: "after"});

    if (!shoppingList) {
        return res.status(404).send({ message: "Shopping list not found" });
    }

    return res.send(shoppingList);
}

const ShareList = async (req, res) => {
    const { email } = req.body;
    const schema = Joi.object({email: Joi.string().min(5).max(255).required().email()});
    const error = schema.validate({email}).error;

    if(error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({email});

    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    const query = { _id: req.params.shoppingListId, userId: req.userId, sharedUsers: { $ne: user._id } };
    const updateDocument = {
        $push: { "sharedUsers": user._id }
    };

    let shoppingList = await ShoppingList.findOneAndUpdate(query, updateDocument, {returnDocument: "after"});

    if (!shoppingList) {
        return res.status(403).send({ message: "User already on this shopping list" });
    }

    await Product.updateMany(
        { shoppingListId: shoppingList._id },
        { $push: { "sharedUsers": user._id }}
    )

    return res.send(shoppingList);
}

const DeleteShoppingList = async (req, res) => {
    let shoppingListToDelete = await ShoppingList.findOneAndDelete({ _id: req.params.shoppingListId, userId: req.userId });

    if (!shoppingListToDelete) return res.status(404).send({ message: 'Shopping list not found' });

    await Product.deleteMany({ shoppingListId: req.params.shoppingListId });

    return res.send({ message: "Shopping list deleted successfully" });
}

const DeleteAllShoppingLists = async (req, res) => {
    let shoppingLists = await ShoppingList.find({ userId: req.userId });

    if (! shoppingLists) return res.status(404).send({ message: 'Shopping list not found' });

    const products = await Product.deleteMany({shoppingListId: shoppingLists})
    shoppingLists = await ShoppingList.deleteMany({ userId: req.userId });

    if (shoppingLists.deletedCount <= 0) {
        return res.send({ message: `No shopping list to delete` });
    }

    return res.send({ message: `Successfully deleted ${shoppingLists.deletedCount} shopping list(s) and ${products.deletedCount} product(s)` });
}

module.exports = {
    AddShoppingList,
    GetAllUserShoppingLists,
    GetUserShoppingList,
    UpdateShoppingList,
    ShareList,
    DeleteShoppingList,
    DeleteAllShoppingLists
};
