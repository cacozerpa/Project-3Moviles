const {Router} = require('express');
const { createUser, updateUser, deleteUser } = require('../helpers/user.auth');
const router = Router();

router.post('/create', createUser);
//router.put('/users', updateUser);
//router.delete('/users', deleteUser);

module.exports = router;