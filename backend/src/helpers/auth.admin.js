const db = require('../utils/db');
const bcrypt = require('bcrypt');
const queries = require('../utils/queries');

const createAdminPass = async (req, res) => {
  const { username ,password } = req.body;

  try {
    await db.query('BEGIN');
    const checkAdmin = await db.query(queries.CHECKADMIN, [username]);
    const adminUser = checkAdmin.rows[0].username;

    if (checkAdmin.rows != '') {
        const salt = bcrypt.genSaltSync(12);
        const HashPass = bcrypt.hashSync(password, salt);
        const response = await db.query(queries.CREATE_ADMINPASS, [ HashPass, adminUser]);
        console.log(response.rows);
        res.status(200).send('Admin Password Created!');
        await db.query('COMMIT');
    } else {
      res.status(400).send('Admin User Does not Exists!');
      console.log('Admin User does not Exists!');
    } 
  } catch (err) {
    res.status(500).send('Server Error! ' + err);
    await db.query('ROLLBACK');
    throw err;
  }
};

module.exports ={
    createAdminPass
}