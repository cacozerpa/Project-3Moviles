const isAuth =  (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else{
        console.log('You must be logged in!');
        res.status(400).send('You must be Logged In!'); 
    }
}

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()){
        console.log('You already have a session!');
        res.status(300).send('You already have a session!');
        }else{
        next();
    }
}

const idExist = (req, res, next) => {
    if(!req.user){
        console.log(`Id ${req.user} doesnt Exist!`);
        res.status(400).send(`Id: ${req.user} doesn't exist!`)
    }else{
        console.log(`User Id: ${req.user}`)
        next();
    }
}

module.exports = {
    isAuth,
    isLogged,
    idExist
}