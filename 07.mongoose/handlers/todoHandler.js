// dependencies
const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("./../schemas/todoSchemas");
const {printError} = require("./errorHandler");
const checkLogin = require("./../middlewares/checkLogin");
const userSchema = require("./../schemas/userSchema");

// create model
const Todo = new mongoose.model("Todo",todoSchema);
const User = new mongoose.model("User",userSchema);

// create router 
const router = express.Router();

// GET ALL THE TODOS
router.get("/",checkLogin,async(req,res)=>{
    // try
    try{
        // await Todo.find({},(findError,data)=>{
        //     // if findError exist
        //     if(findError){
        //         // print error first
        //         printError(findError);

        //         // response the server
        //         res.status(500).json({
        //             message : "There was a problem in server side!"
        //         });
        //     }else{
        //         // print message
        //         console.log("|===> 🗂️  Data Was successfully Read! 🗂️ <====|\n");

        //         // response the user
        //         res.json({
        //             message : "Data was successfully read!",
        //             result : data
        //         })
                
        //     }
        // })

        // do it with chaining
        Todo.find({})
            .populate("user","username name -_id")
            .select({
                _id : 0,
                __v : 0
            })
            .limit(2)
            .exec((findError,data)=>{
            // if error was exist
            if(findError){
                // print error
                printError(findError);

                // response user
                res.status(500).json({
                    message : "There was a problem in server side."
                });
            }else{
                // print the message
                console.log("|===> 🗂️  Data Was successfully Read! 🗂️ <====|\n");

                // response the user
                res.json({
                    message : "Data was successfully read!",
                    result : data
                });
            }
        });

    }catch(error){
        // print error
        printError(error);
    }
});

// GET ACTIVE
router.get("/active",async(req,res)=>{
    // try first
    try{
        // create todo
        let todo = new Todo();

        // get active
        let result = await todo.findActive();

        // print message 
        console.log("|===> 🗂️  Data Was successfully Read! 🗂️ <====|\n");

        // send response
        res.json(result);

    }catch(catchError){
        // print Error
        printError(catchError);

        // send response
        res.status(500).json({
            message : "There was a problem in server side.yes"
        });
    }
})

// GET INACTIVE
router.get("/inactive",async(req,res)=>{
    // try
    try{
        // create todo
        let todo = new Todo();

        // get result 
        let result = await todo.findInactive();

        // print message
        console.log("|===> 🗂️  Data Was successfully Read! 🗂️ <====|\n");

        // send response
        res.json(result);
    }catch(catchError){
        // print error
        printError(catchError);
    }
});

// GET ACTIVE BY CALLBACK
router.get("/activecallback",(req,res)=>{
    // create todo 
    let todo = new Todo();

    // get result
    todo.findActiveCallback((findError,data)=>{
        // if findError exist
        if(findError){
            // printError
            printError(findError);

            // response
            res.status(500).json({
                message : "There was a server side error."
            });
        }

        // if findError dose not exist
        // print message 
        console.log("|===> 🗂️  Data Was successfully Read! 🗂️ <====|\n");

        // send response
        res.json(data);
    });
});

// GET JS
router.get("/js",async(req,res)=>{
    // try
    try{
        const result = await Todo.findByJs();

        // print message 
        console.log("|===> 🗂️  Data Was successfully Read! 🗂️ <====|\n");

        // send response
        res.json(result);
    }catch(catchError){
        // printError
        printError(catchError);

        // send response
        res.status(500).json({
            message : "There was a problem in server side"
        });
    }
});

// GET WORD
router.get("/word",async(req,res)=>{
    // try
    try{
        // get result
        const result = await Todo.find().findByWord("js");

        // print message
        console.log("|===> 🗂️  Data Was successfully Read! 🗂️ <====|\n");

        // send response
        res.json(result);
    }catch(catchError){
        // print Error
        printError(catchError);

        // send response
        res.status(200).json({
            messsage : "There was a problem in server side."
        });
    }
});

// GET A TODOS BY ID
router.get("/:id",(req,res)=>{
    // try
    try{
        // find data
        Todo
            .find({_id : req.params.id})
            .select({
                _id : 0,
                __v : 0
            })
            .exec((findError,data)=>{
                // if findError exist
                if(findError){
                    // print error
                    printError(findError);

                    // response data
                    res.status(500).json({
                        message : "There was a problem in server side."
                    })
                }else{
                    // print message
                    console.log("|===> 🗂️  Data Was successfully Read! 🗂️ <====|\n");

                    // send response
                    res.json({
                        message : "Data was successfully read!",
                        result : data
                    });
                }
            })

    }catch(catchError){
        // print catchError
        printError(catchError);
    }
});

// POST A TODO
router.post("/",checkLogin,async(req,res)=>{
    // try
    try{
        // target req.body
        const newTodo = new Todo({
            ...req.body,
            user : req.userId
        });

        // save todo
        const result = await newTodo.save();

        // userfield update
        await User.updateOne({
            _id : req.userId
        },{
            $push : {
                todos : result._id
            }
        });

        // print success message
        console.log("|===> 🗂️  Data Was Inserted successfully! 🗂️ <====|\n");

        // if data successfully
        res.status(200).json({
            message: "Todo was inserted successfully!"
        })
    }catch(catchError){
        // print error
        printError(catchError);

        // send response
        res.status(500).json({
            message : "There was a problem in server side."
        });
    }
});

// POST MULTIPLE TODO
router.post("/all",(req,res)=>{
    // insert the many data from req.body
    Todo.insertMany(req.body,(saveError)=>{
        // if saveError exist
        if(saveError){
            // print error
            printError(saveError);

            // response the error
            res.status(500).json({
                error : "There was a server side Error!"
            });
        }else{
            // if saveError dose not exist
            // print success message
            console.log("|===> 🗂️  Data Were Inserted successfully! 🗂️ <====|\n");

            // if data successfully
            res.status(200).json({
                message: "Todo were inserted successfully!"
            });
        }
    })
});

// PUT TODO
router.put("/:id",(req,res)=>{
    try{
        Todo.findByIdAndUpdate(
            {_id : req.params.id},
            {
                $set : {
                    status : "inactive"
                }
            },
            {   
                new : true,
                useFindAndModify : false
            },
            (updateError)=>{
                // if updateError exist
                if(updateError){
                    // print error
                    printError(updateError);
    
                    // response the error
                    res.status(500).json({
                        error : "There was a Server Side Error!"
                    });
                }else{
                    // if error dose not exist
                    // print message
                    console.log("|===> 🗂️  Data Was Updated successfully! 🗂️ <====|\n");
    
                    // response success
                    res.json({
                        message : "Todo Was Update successfully!"
                    });
                }
            });
        
        // print the result
        // console.log("|===> 🗂️  Updated result 🗂️ <====|\n");
        // console.log(result);
        // console.log();
    }catch(error){
        printError(error);
    }
});

// DELETE TODO
router.delete("/:id",(req,res)=>{
    Todo.deleteOne({_id : req.params.id},(deleteError)=>{
        if(deleteError){
            // print deleteError
            printError(deleteError);

            // response deleteError
            res.status(500).json({
                message : "There was problem in server side."
            });
        }else{
            // print success message
            console.log("|===> 🗂️  Data was Deleted! 🗂️ <====|\n");

            // send the response
            res.json({
                message : "Data Was deleted."
            });
        }
    });
});

// export the router
module.exports = router;