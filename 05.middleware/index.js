const express = require("express");

const app = express();
const admin = express.Router();

// admin
admin.use(logger)

admin.get("/dashboard",(req,res)=>{
    res.send("This is dashboard");
})

admin.get("/error",(req,res)=>{
    throw new Error("This is server side error");
})

admin.use((error,req,res,next)=>{
    console.log(error.message);
    res.send(error.message);
});

// middleware
function logger(req,res,next){
    let log = `Time :${new Date().toLocaleTimeString()} url:${req.originalUrl} method:${req.method} protocol:${req.protocol} ip:${req.ip}`;

    console.log(log);
    next();
}

// app
app.use("/admin",admin);

app.get("/about",(req,res)=>{
    res.send("This is about!");
})

// listen the app
app.listen(3030,()=>{
    console.log("http://localhost:3030");
})