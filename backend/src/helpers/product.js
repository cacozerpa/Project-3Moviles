const db = require('../utils/db');
const queries = require('../utils/queries');

const getProducts = async (req, res) => {
    try{
        const response = await db.query(queries.GET_PRODUCTS);
        console.log('Showing Products!');
        res.status(200).send(response.rows);
        }catch(err){    
        res.status(500).send('Server Error!')
        throw err;
        }
}

const getProductById = async (req, res) => {
    try{

        const id = req.params.id;
        const checkId = await db.query(queries.CHECKPRODUCTID, [id]);
    
        if(checkId.rows != ''){
            const response = await db.query(queries.GET_PRODUCTBYID, [id]);
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

const getProductByCommerce = async (req, res) => {
    try{
        const id = req.params.id;
        const checkId = await db.query(queries.CHECKCOMMERCEID, [id]);

        if(checkId.rows != ''){
            const response = await db.query(queries.GET_PRODUCTSBYCOMMERCE, [id]);
            console.log(`Showing Commerce (${id}) Products!`);
            res.status(200).send(response.rows);
        }else{
            res.status(400).send(`Commerce ${id} not found!`);
        }
    }catch(err){
        res.status(500).send('Server Error!')
        throw err; 
    }
}

module.exports = {
    getProducts,
    getProductById,
    getProductByCommerce
}