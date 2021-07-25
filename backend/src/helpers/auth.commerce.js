const db = require('../utils/db');
const queries = require('../utils/queries');

const createCommerce = async (req, res) => {
    const {name, category, location, dsc} = req.body;

    try {
    
    await db.query('BEGIN');

    const checkExistence = await db.query(queries.CHECKEXISTENCE, [name]);

    if(checkExistence.rows == ''){
        const response = await db.query(queries.CREATE_COMME, [name, category, location, dsc]);
        console.log('Commerce Created' + response.rows);
        await db.query('COMMIT');
        res.status(200).send(`Commerce registration (${name}) successfull!`);
    }else{
        await db.query('ROLLBACK');
        res.status(400).send('Commerce already Exist!');
    }
    
    }catch(err) {
        res.status(500).send('Server Error! ');
        throw err;
    }
}

const updateCommerce = async (req, res) => {
    const id = req.params.id;

    const {name, category, location, dsc} = req.body;
    console.log(name, category, location, dsc);

    try{
       await db.query('BEGIN'); 
       const checkId = await db.query(queries.CHECKCOMMERCEID, [id]);
       const checkExistence = await db.query(queries.CHECKEXISTENCE, [name]);
        
       if(checkId.rows != ''){
           if(checkExistence.rows == ''){
        const response = await db.query(queries.UPDATE_COMMERCE, [name, category, location, dsc, id]);
        console.log(response.rows);
        res.status(200).send(`Commerce ${id} updated!`)
        await db.query('COMMIT');
       }else{
        console.log(`Commerce name ${name} already exist!`)
        res.status(400).send(`Commerce ${name} already exist!`);
       }
       }else{
        console.log(checkId);
        await db.query('ROLLBACK');
        res.status(400).send(`Commerce ${id} not Found!`);
       }
    }catch(err){
        await db.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}

const deleteCommerce = async (req, res) => {
    try{
       const id = req.params.id;
        
       await db.query('BEGIN'); 
       const checkId = await db.query(queries.CHECKCOMMERCEID, [id]);

       if(checkId != '') {
           const response = await db.query(queries.DELETE_COMMERCE, [id]);
           console.log(response.rows);
           res.status(200).send(`Commerce ${id} deleted!`);
            await db.query('COMMIT');
       }else{
        await db.query('ROLLBACK');
        res.status(400).send(`Commerce ${id} not Found!`);
       }
    }catch(err){      
        await db.query('ROLLBACK');
        res.status(500).send('Server Error!');
        throw err;
    }
}
module.exports = {
    createCommerce,
    updateCommerce,
    deleteCommerce
}