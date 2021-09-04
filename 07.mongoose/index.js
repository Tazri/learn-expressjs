// dependencies
const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./handlers/todoHandler");
const userHandler = require("./handlers/userHandler");
const dotenv = require("dotenv");
const { printError } = require("./handlers/errorHandler");

// update env variable
dotenv.config();

// connect with the mongoose
mongoose.connect("mongodb://localhost/todos",{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
    .then(()=>{
        console.log("\n|====> ✅ MongoDB Connection Successfully ✅ <====|\n");
    })
    .catch((error)=>{
        console.log("\n|====> ❌ Error ❌ <====|\n");
        console.log(error);
    });

// create app 
const app = express();

// useJson for pasre json
app.use(express.json());

// todo route handler
app.use("/todo",todoHandler);

// user route handler
app.use("/user",userHandler);

// default error handler
app.use((error,req,res,next)=>{
    // if headersSent is true
    if(req.headersSent){
        next(error);
    }

    // printError
    printError(error);

    // else
    res.status(500).json({error});
});

// listen the app
app.listen(3030,()=>{
    // clear the console and print the message
    console.clear();
    console.log("|====> 🖥️  Your Server Listening on PORT 3030 <====|");
    console.log("||\n||\n||\n||\n||\n||\n||\n||");
    console.log("|====> 🚙 Go to http://localhost:3030 <====|\n");
})