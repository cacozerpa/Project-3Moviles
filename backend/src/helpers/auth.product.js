const db = require('../utils/db');
const queries = require('../utils/queries');

const createProduct = async (req, res) => {
    const {name, dsc, price} = req.body;
    const id = req.params.id

    try {
    
    await db.query('BEGIN');
    
    const response = await db.query(queries.CREATE_PRODUCT, [id, name, dsc, price]);
    console.log('Product Created' + response.rows);
    await db.query('COMMIT');
    res.status(200).send(`Product registration (${name}) to Commerce ${id} successfull!`);
    
    
    }catch(err) {
        res.status(500).send('Server Error! ');
        throw err;
    }
}

const updateProduct = async (req, res) => {
    
    const id = req.params.id;
    const {name, dsc, price} = req.body;

    try{
       await db.query('BEGIN'); 
       const checkId = await db.query(queries.CHECKPRODUCTID, [id]);
        
       if(checkId.rows != ''){
        const response = await db.query(queries.UPDATE_PRODUCT, [name, dsc, price, id]);
        console.log(response.rows);
        res.status(200).send(`Product ${id} updated!`)
        await db.query('COMMIT');
       }else{
        console.log(checkId);
        await db.query('ROLLBACK');
        res.status(400).send(`Product ${id} not Found!`);
       }
    }catch(err){
        await db.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}

const deleteProduct = async (req, res) => {
    try{
       const id = req.params.id;
        
       await db.query('BEGIN'); 
       const checkId = await db.query(queries.CHECKPRODUCTID, [id]);

       if(checkId != '') {
           const response = await db.query(queries.DELETE_PRODUCT, [id]);
           console.log(response.rows);
           res.status(200).send(`Product ${id} deleted!`);
            await db.query('COMMIT');
       }else{
        await db.query('ROLLBACK');
        res.status(400).send(`Product ${id} not Found!`);
       }
    }catch(err){      
        await db.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct
}