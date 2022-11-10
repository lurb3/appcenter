require('dotenv').config();
const { Product, validate } = require('../models/Product');
const { ShoppingList } = require('../models/ShoppingList');

const AddProduct = async (req, res) => {
    const { error } = validate(req.body);
    const { name, price, quantity, productLink, notes } = req.body;

    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    let shoppingList = await ShoppingList.findOne({ _id: req.params.shoppingListId });

    if (! shoppingList) return res.status(404).send({ message: 'Shopping list not found' });

    let product = await Product.findOne({ name: name.toLowerCase(), shoppingListId: req.params.shoppingListId });

    if (product) {
        return res.status(400).send({ message: 'You already own that product' });
    }

    product = new Product({
        name: name.toLowerCase(),
        price: price,
        quantity: quantity,
        productLink: productLink,
        notes: notes,
        shoppingListId: req.params.shoppingListId
    });

    await product.save();

    res.send(product);
}

const GetShoppingListProducts = async (req, res) => {
    let products = await Product.find({ shoppingListId: req.params.shoppingListId });

    if (! products) return res.status(404).send({ message: 'Products not found' });

    return res.send(products);
}

const DeleteProduct = async (req, res) => {
    let productToDelete = await Product.deleteOne({ _id: req.params.productId });

    if (productToDelete.deletedCount > 0) {
        return res.send({ message: "Product deleted successfully" });
    }

    return res.status(404).send({ message: 'Product not found' });
}

const DeleteAllShoppingListProducts = async (req, res) => {
    let products = await Product.deleteMany({ shoppingListId: req.params.shoppingListId });

    if (! products) return res.status(404).send({ message: 'Products not found' });
    
    if (products.deletedCount <= 0) {
        return res.send({ message: `No products to delete` });
    }
    return res.send({ message: `Successfully deleted ${products.deletedCount} product(s)` });
}

module.exports = { AddProduct, GetShoppingListProducts, DeleteProduct, DeleteAllShoppingListProducts };