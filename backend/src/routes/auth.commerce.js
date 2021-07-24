const {Router} = require('express');
const { createCommerce, updateCommerce, deleteCommerce } = require('../helpers/auth.commerce');
const router = Router();

router.post('/createcommerce', createCommerce);
router.put('/updatecommerce/:id', updateCommerce);
router.delete('/deletecommerce/:id', deleteCommerce);

module.exports = router;