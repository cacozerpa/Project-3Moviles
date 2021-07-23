const db = require('../utils/db');
const queries = require('../utils/queries');

const createCommerce = async (req, res) => {
    const {name, category, location, dsc} = req.body;

    try {
    
    await db.query('BEGIN');

    const checkExistence = db.query(queries.CHECKEXISTENCE, [name]);

    if(checkExistence.rows == ''){
        const res = await db.query(queries.CREATE_COMMER, [name, category, location, dsc]);
        console.log('Commerce Created' + res.rows);
        await db.query('COMMIT');
        res.status(200).send(`Commerce registration (${name}) successfull!`);
    }else{
        await db.query('ROLLBACK');
        res.status(400).send('Commer already Exist!');
    }
    
    }catch(err) {
        res.status(500).send('Server Error! ');
        throw err;
    }
}

module.exports = {
    createCommerce,
}