const db = require('../utils/db');
const queries = require('../utils/queries');

const createPayment = async (req, res) => {
    try{
        const {from, to, name, ci, dt, code, amount} = req.body;
        const id = req.params.id;

        await db.query('COMMIT');

        checkId = await db.query(queries.CHECKPRODUCTID, [id]);

        if(checkId != ''){
            const response = await db.query(queries.CREATE_PAYMENT, [id, from, to, name, ci, dt, code, amount]);
            console.log('Payment Added!');
            res.status(200).send('Payment Successfuly added!');
        }else{
            res.status(400).send(`Product ID ${id} not found!`);
        }

    }catch(err){
        res.status(500).send(`Server Error!`);
        throw err;
    }
}

const deletePayment = async (req, res) => {
    try{
        const id = req.params.id;
         
        await db.query('BEGIN'); 
        const checkId = await db.query(queries.CHECKPAYMENT, [id]);
 
        if(checkId != '') {
            const response = await db.query(queries.DELETE_PAYMENT, [id]);
            console.log(response.rows);
            res.status(200).send(`Payment ${id} deleted!`);
             await db.query('COMMIT');
        }else{
         await db.query('ROLLBACK');
         res.status(400).send(`Payment ${id} not Found!`);
        }
     }catch(err){      
         await db.query('ROLLBACK');
         res.status(500).send('Server Error!');
         throw err;
     }
}

module.exports = {
    createPayment,
    deletePayment
}