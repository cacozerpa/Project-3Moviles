const querys = {

    //User Queries
    GET_USERS: `SELECT * FROM public."Users"`,
    GET_USERBYID: `SELECT * FROM public. "Users" WHERE id = $1`,
    CREATE_USER: `INSERT INTO public."Users" (username, email, password) VALUES ($1, $2, $3) RETURNING *`,        
    GET_USERBYID: `SELECT * FROM public."Users" WHERE id = $1`,
    GET_USERBYUSERNAME: `SELECT * FROM public."Users" WHERE username = $1`,
    UPDATE_USER: `UPDATE public."Users" SET email = $1 WHERE id= $2 RETURNING *`,
    DELETE_USER: `DELETE FROM public."Users" WHERE id = $1`,

    //LogIn
    LOGIN: `SELECT * FROM public. "Users" WHERE username = $1 AND password= $2`,

    //Validation Queries
    CHECKEMAIL: `SELECT * FROM public."Users" WHERE email = $1`,
    CHECKUSER: `SELECT * FROM public."Users" WHERE username = $1`,
    CHECKID: `SELECT * FROM public. "Users" WHERE id = $1`,
    CHECKEXISTENCE: `SELECT * FROM public. "Commerce" WHERE name = $1`,

    //Commerce Queries

    CREATE_COMME: `INSERT INTO public. "Commerce" (name, category, location, dsc) VALUES ($1, $2, $3, $4) RETURNING *`,       
    
}

module.exports = querys;