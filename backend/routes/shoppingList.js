const authJWT = require('../middlewares/authJWT')
const express = require('express');
const router = express.Router();
const ShoppingListController = require('../controllers/ShoppingListController');

router.post('/', authJWT, ShoppingListController.AddShoppingList);
router.get('/', authJWT, ShoppingListController.GetAllUserShoppingLists);
router.get('/:shoppingListId', authJWT, ShoppingListController.GetUserShoppingList);
router.put('/:shoppingListId', authJWT, ShoppingListController.UpdateShoppingList);
router.delete('/list/:shoppingListId', authJWT, ShoppingListController.DeleteShoppingList);
router.delete('/all', authJWT, ShoppingListController.DeleteAllShoppingLists);


module.exports = router;