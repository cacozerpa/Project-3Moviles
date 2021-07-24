const {Router} = require('express');
const { getProducts, getProductById, getProductByCommerce } = require('../helpers/product');
const router = Router();

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.get('/products/:id', getProductByCommerce);

module.exports = router;