const localStrategy = require('passport-local').Strategy;
const userHelper = require('../helpers/user');
const bcrypt = require('bcrypt');

const localOptions = {
  usernameField: 'email',
  passwordField: 'password'
};

module.exports = new localStrategy(localOptions, async (email, password, done)=>{
  try{
    const user = await userHelper.getUserByEmail(email);
    if(user != null){
      const pass = await bcrypt.compare(password, user.password);
      if(pass != ''){
        return done(null, user)
      }else{
        return done(null, false, {message: 'Password Incorrect!'})
      }
    }else{
      return done(null, false), {message: 'Email not Found!'};
    }
  }catch(err){
    done(err);
    throw err;
  }
})