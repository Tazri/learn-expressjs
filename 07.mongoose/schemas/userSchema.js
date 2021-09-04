// dependencies
const mongoose = require("mongoose");

// createSchema 
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["active","inactive"]
    },
    todos : [
        {
            type : mongoose.Types.ObjectId,
            ref : "Todo"
        }
    ]
});


// export userSchema
module.exports = userSchema;