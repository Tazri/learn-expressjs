//dependencies
const jwt = require("jsonwebtoken");
const { printError } = require("./../handlers/errorHandler");

// create checkLogin
const checkLogin = (req,res,next)=>{
    // try
    try{
        // get token
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];

        // verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {username, userId} = decoded;

        // set username and userId in req
        req.username = username,
        req.userId = userId;

        // pass the next
        next();

    }catch(catchError){
        // print error
        printError(catchError);
        next("Authorization Problem!");
    }
}

// export checkLogIN
module.exports = checkLogin;