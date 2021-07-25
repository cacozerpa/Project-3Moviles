const querys = {

    //User Queries
    GET_USERS: `SELECT * FROM public."Users"`,
    GET_USERBYID: `SELECT * FROM public. "Users" WHERE user_id = $1`,
    CREATE_USER: `INSERT INTO public."Users" (user_email, user_password) VALUES ($1, $2) RETURNING *`,        
    GET_USERBYID: `SELECT * FROM public."Users" WHERE user_id = $1`,
    GET_USERBYEMAIL: `SELECT * FROM public."Users" WHERE user_email = $1`,
    UPDATE_USER: `UPDATE public."Users" SET user_email = $1 WHERE user_id= $2 RETURNING *`,
    DELETE_USER: `DELETE FROM public."Users" WHERE user_id = $1`,

    //LogIn
    LOGIN: `SELECT * FROM public. "Users" WHERE user_email = $1 AND user_password= $2`,

    //Validation Queries
    CHECKEMAIL: `SELECT * FROM public."Users" WHERE user_email = $1`,
    CHECKID: `SELECT * FROM public. "Users" WHERE user_id = $1`,
    CHECKEXISTENCE: `SELECT * FROM public. "Commerce" WHERE commerce_name = $1`,
    CHECKCOMMERCEID: `SELECT * FROM public. "Commerce" WHERE commerce_id = $1`,
    CHECKPRODUCTID: `SELECT FROM public. "Product" WHERE product_id = $1`,
    CHECKADMIN: `SELECT FROM public. "Admin" WHERE username = $1`,

    //Commerce Queries

    CREATE_COMME: `INSERT INTO public. "Commerce" (commerce_name, commerce_category, commerce_location, commerce_dsc) VALUES ($1, $2, $3, $4) RETURNING *`,       
    GET_COMMERCES: `SELECT * FROM public. "Commerce"`,
    GET_COMMERCEBYID: `SELECT * FROM public. "Commerce" WHERE commerce_id = $1`,
    UPDATE_COMMERCE: `UPDATE public. "Commerce" SET commerce_name = $1, commerce_category = $2, commerce_location = $3, commerce_dsc = $4 WHERE commerce_id = $5 RETURNING *`,
    DELETE_COMMERCE: `DELETE FROM public. "Commerce" WHERE commerce_id = $1`,

    //Product Queries

    CREATE_PRODUCT: `INSERT INTO public. "Product" (name, dsc, price) VALUES ($1, $2, $3) RETURNING *`,
    UPDATE_PRODUCT: `UPDATE public. "Product" SET name = $1, dsc = $2, price = $3 WHERE id = $5`,
    DELETE_PRODUCT: `DELETE FROM public. "Product" WHERE id = $1`,
    GET_PRODUCTS: `SELECT * FROM public. "Products"`,
    GET_PRODUCTBYID:`SELECT * FROM public. "Products" WHERE id = $1`,
    GET_PRODUCTSBYCOMMERCE: `SELECT * FROM public. "Products" WHERE idcommerce = $1`,

    //Admin Queries

    CREATE_ADMINPASS: `UPDATE public. "Admin" SET password = $1 WHERE username = $2`,
}

module.exports = querys;