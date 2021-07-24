const {Router} = require('express');
const { getCommerces, getCommerceById } = require('../helpers/commerce');
const router = Router();

router.get('/commerce', getCommerces);
router.get('/commerce/:id', getCommerceById);

module.exports = router;