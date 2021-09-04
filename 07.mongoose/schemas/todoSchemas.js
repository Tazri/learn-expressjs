// dependencies
const mongoose = require("mongoose");

/**
 * object model
 * {
 *  title : string/required,
 *  description : string/not required,
 *  status : string/enum(active,inactive),
 *  date : Date,default(Date.now())
 * }
 */

// create schema
const todoSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : String,
    status : {
        type : String,
        enum : ['active','inactive']
    },
    date : {
        type : Date,
        default : Date.now()
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
})

// instance method
todoSchema.methods = {
    findActive : function(){
        return mongoose.model("Todo").find({status : "active"}).select({_id :0,__v : 0});
    },
    findInactive : function(){
        return mongoose.model("Todo").find({status : "inactive"});
    },
    findActiveCallback : function(cb){
        return mongoose.model("Todo").find({status : "active"},cb);
    }
}

// static mathods
todoSchema.statics = {
    findByJs : function(){
        return this.find({title : /js/i}).select({_id : 0,__v : 0});
    }
}

// query
todoSchema.query = {
    findByWord : function(word){
        return this.find({title : RegExp(word,"i")}).select({_id: 0,__v:0});
    }
}

module.exports = todoSchema;