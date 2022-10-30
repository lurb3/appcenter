const authJWT = require('../middlewares/authJWT')
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.post('/:shoppingListId', authJWT, ProductController.AddProduct);
router.get('/:shoppingListId', authJWT, ProductController.GetShoppingListProducts);
router.delete('/:productId', authJWT, ProductController.DeleteProduct);

module.exports = router;