const {Router} = require('express');
const { createAdminPass } = require('../helpers/auth.admin');
const router = Router();

router.put('/admin', createAdminPass);

module.exports = router;