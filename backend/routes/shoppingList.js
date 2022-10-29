const authJWT = require('../middlewares/authJWT')
const express = require('express');
const router = express.Router();
const ShoppingListController = require('../controllers/ShoppingListController');

router.post('/', authJWT, ShoppingListController.AddShoppingList);
module.exports = router;