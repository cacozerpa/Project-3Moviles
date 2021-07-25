const db = require('../utils/db');
const queries = require('../utils/queries');


const getCommerces = async (req, res) => {
    try{
        const response = await db.query(queries.GET_COMMERCES);
        console.log('Showing Commerces!');
        res.status(200).send(response.rows);
        }catch(err){    
        res.status(500).send('Server Error!')
        throw err;
        }
}

const getCommerceById = async (req, res) => {
    try{

        const id = req.params.id;
        const checkId = await db.query(queries.CHECKCOMMERCEID, [id]);
    
        if(checkId.rows != ''){
            const response = await db.query(queries.GET_COMMERCEBYID, [id]);
            console.log(`Showing Product ${id}!`);
            res.status(200).send(response.rows);
        }else{
            res.status(400).send(`Product ${id} not found!`)
        }
    
        }catch(err){
            res.status(500).send('Server Error!')
            throw err;
        }
}

module.exports = {
    getCommerces,
    getCommerceById
}