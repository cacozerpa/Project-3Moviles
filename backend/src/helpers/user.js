const db = require('../utils/db');
const queries = require('../utils/queries');

const getUsers = async (req, res) =>{
    try{
    const response = await db.query(queries.GET_USERS);
    console.log('Showing Users: ' + '\n' + response.rows);
    res.status(200).send(response.rows);
    
    }catch(err){    
        res.status(500).send('Server Error')
        throw err;
    }
}

const getUsersByUserId = async (req,res) => {
    try{

    const id = req.user;
    const checkId = await db.query(queries.CHECKID, [id]);

    if(checkId.rows != ''){
        const response = await db.query(queries.GET_USERBYID, [id]);
        console.log(`Showing User ${id}!`);
        res.status(200).send(response.rows);
    }else{
        res.status(400).send(`User ${id} not found!`)
    }

    }catch(err){
        res.status(500).send('Server Error: ' + err)
        throw err;
    }
}

const getUserByEmail = async (email) => {

    try{ 
       
        const response = await db.query(queries.GET_USERBYEMAIL, [email]);
        if(response){
            console.log('Email Found!')
            return ({
                id: response.rows[0].user_id,
                email: response.rows[0].user_email,
                password: response.rows[0].user_password
            })
        }else{
           console.log('Email Not Found!')
           return null;
        }

    }catch(err){
        res.status(500).send('Server Error: ' + err);
        throw err; 
    }
}

module.exports = {
    getUsers,
    getUsersByUserId,
    getUserByEmail
}