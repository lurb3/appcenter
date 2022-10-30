const authJWT = require('../middlewares/authJWT')
const express = require('express');
const router = express.Router();
const ShoppingListController = require('../controllers/ShoppingListController');

router.post('/', authJWT, ShoppingListController.AddShoppingList);
router.get('/', authJWT, ShoppingListController.GetAllUserShoppingLists);
router.get('/:shoppingListId', authJWT, ShoppingListController.GetUserShoppingList);
module.exports = router;
router.delete('/:shoppingListId', authJWT, ShoppingListController.DeleteShoppingList);
module.exports = router;