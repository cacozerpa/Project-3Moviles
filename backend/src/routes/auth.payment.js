const {Router} = require('express');
const { createPayment, deletePayment } = require('../helpers/auth.payment');
const router = Router();

router.post('/createpayment/:id', createPayment);
router.delete('/deletepayment/:id', deletePayment);

module.exports = router;