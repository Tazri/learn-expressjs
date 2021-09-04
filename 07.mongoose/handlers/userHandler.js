// dependencies
const express = require("express");
const mongoose = require("mongoose");
const { printError } = require("./errorHandler");
const userSchema = require("./../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create user model
const User = new mongoose.model("User",userSchema);

// create router
const router = express.Router();

// POST SIGNUP
router.post("/signup",async(req,res)=>{
    // try
    try{
        // hased password
        const hasedPassword = await bcrypt.hash(req.body.password,10);

        // create new user
        const user = new User({
            name : req.body.name,
            username : req.body.username,
            status : req.body.status,
            password : hasedPassword
        });

        // save the user in database
        await user.save();

        // print message
        console.log("|===> 👤  User Was Create Successfully! 👤 <====|\n");

        // send response
        res.status(200).json({
            message : "User was created successfully!"
        });
    }catch(catchError){
        // printError
        printError(catchError);

        // send response
        res.status(500).json({
            message : "There was a problem in server side."
        });
    }
});

// POST LOGIN
router.post("/login",async(req,res)=>{
    // try
    try{
        // get user
        const user = await User.find({ username : req.body.username});

        // if user name is exist
        if(user && user.length > 0){
            // check is valid password
            const isValidPassword = await bcrypt.compare(req.body.password,user[0].password);

            // if is not valid password
            if(!isValidPassword){
                // print authenticate failure
                console.log("|===> 🚷  Authentication Failure! 🚷 <====|\n");
                
                // send response
                res.status(401).json({
                    message : "Authentication Failure!"
                });
                return;
            }

            // if password is valid
            // generate webtoken
            const token = jwt.sign({
                username : user[0].username,
                userId : user[0]._id
            }, process.env.JWT_SECRET,{
                expiresIn : "1h"
            });
            
            // print successfully authentication
            console.log("|===> 👍  Successfully Authentication! 👍 <====|\n");

            // send the response
            res.status(200).json({
                message : "Authentication Successfully!",
                token
            });
        }else{
            // print authenticate failure
            console.log("|===> 🚷  Authentication Failure! 🚷 <====|\n");

            // send response 
            res.status(401).json({
                messaage : "Authentication Failure!"
            })
        }

    }catch(catchError){
        // print catchError
        printError(catchError);

        // send response
        res.status(401).json({
            message : "Authentication Failure!"
        })
    }
});

// GET USER
router.get("/all",async(req,res)=>{
    // try first 
    try{
        // gets users
        const user = await User.find({
            status :"active"
        }).populate("todos")

        // print message
        console.log("|===> 👥  Successfully Authentication! 👥 <====|\n");

        // send response
        res.json({
            message : "Successfully Read!",
            result : user
        });
    }catch(catchError){
        // print error
        printError(catchError);

        // send response
        res.status(401).json({
            message : "There was a problem in server side."
        });
    }
})

// export router
module.exports = router;