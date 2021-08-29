const express = require("express");

const app = express();

// for get json file
// app.use(express.json({
//     limit : "200kb", // define the size of req body
//     verify : (req,res,buffer,encodeType)=>{
        
//     }, // this function execute every request 
//     strict : true, // strict mode. only accept array or object
// }));

// for get raw data
// app.use(express.raw());

// Express Router

const admit = express.Router();


// add another router with main app
app.use("/admit",admit);

admit.get("/",(req,res)=>{
    res.send("Hello, i am admit");
})

admit.get("/dashboard",(req,res)=>{
    res.send("Hello, I am dashboard");
})

// get plain text
// app.use(express.text());

// urlencoded
// app.use(express.urlencoded());


// for create public file
app.use(express.static(__dirname+"/public",{
    index : "main.html"
}));

app.post('/',(req,res)=>{
    console.log(req.body);
    res.send();
});

app.listen(3030,()=>{
    console.log("Server is running in 3030 port.");
});