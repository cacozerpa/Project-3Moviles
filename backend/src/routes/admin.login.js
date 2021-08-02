const {Router} = require('express');
const router = Router();
const passport = require('passport');

const {isAuth, isLogged} = require('../validations/auth');

router.post('/adminlogin', isLogged, passport.authenticate('admin') , async(req, res) => {
    console.log('User Logged In!');
    res.status(200).send('User Logged in!');
});

router.get('/adminlogout', isAuth, (req, res) => {
    req.logout();
    console.log('Logged Out!');
    res.status(200).send('Logged Out!');
})

module.exports = router;