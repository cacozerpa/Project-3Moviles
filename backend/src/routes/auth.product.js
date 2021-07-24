const {Router} = require('express');
const { createProduct, updateProduct, deleteProduct } = require('../helpers/auth.product');
const router = Router();

router.post('/createproduct', createProduct);
router.put('/updateproduct/:id', updateProduct);
router.delete('/deleteproduct/:id', deleteProduct);

module.exports = router;