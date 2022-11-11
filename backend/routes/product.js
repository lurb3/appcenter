const authJWT = require('../middlewares/authJWT')
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.post('/:shoppingListId', authJWT, ProductController.AddProduct);
router.get('/:shoppingListId', authJWT, ProductController.GetShoppingListProducts);
router.put('/:productId', authJWT, ProductController.UpdateProduct);
router.delete('/:productId', authJWT, ProductController.DeleteProduct);
router.delete('/:shoppingListId/all', authJWT, ProductController.DeleteAllShoppingListProducts);

module.exports = router;