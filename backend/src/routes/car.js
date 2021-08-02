const {Router} = require('express');
const { createCar, deleteItem } = require('../helpers/car');
const router = Router();

router.post('/addcar/:id', createCar);
router.get('/car', function(req, res){
    console.log(req.session);
    res.status(200).send(req.session.car)
})
router.delete('/deleteitem/:id', deleteItem);

module.exports = router;