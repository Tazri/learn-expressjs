const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const admin = express.Router();


// see baseUrl, originalUrl and path

// app.use("/admin",admin);

// admin.get("/dashboard",(req,res)=>{
//     console.log("baseUrl = ",req.baseUrl);
//     console.log("originalUrl = ",req.originalUrl);
//     console.log("path = ",req.path);
//     res.send("this is admin panel");
// });


// app.get("/",(req,res)=>{
//     console.log("baseUrl = ",req.baseUrl);
//     console.log("originalUrl = ",req.originalUrl);
//     console.log("path = ",req.path);
//     res.send("this is app panel");
// })

// see hostname, ip, protocol
// app.get("/",(req,res)=>{
//     console.log("hostname ",req.hostname);
//     console.log(req.ip);
//     console.log("protocol ",req.protocol);
//     res.send("this is app");
// })

// query and params
// app.get("/user/:id/:phone",(req,res)=>{
//     const query = req.query;
//     const params = req.params;

//     console.log("query",query);
//     console.log("params",params);

//     let msg = `user ${params.id} and phone ${params.phone}`;
    
//     res.send(msg);
// })

// cookie,secure,app
// app.use(cookieParser());

// app.get("/",(req,res)=>{
//     console.log(req.cookies);
//     console.log("req.secure = ",req.secure);
//     console.log("app.get(view engine) ",req.app.get("view engine"));
//     res.send("Got it");
// })

// route
// app.get("/",(req,res)=>{
//     console.log(req.route);
//     res.send("Got it");
// })

// access header req.get
// app.get("/",(req,res)=>{
//     console.log(req.get("content-type"));
//     res.send("get it");
// })

// req.accept
// app.get("/",(req,res)=>{
//     console.log(req.accepts("html"))
//     console.log(req.accepts("json"));
//     res.send("get it");
// })


app.listen(3030,()=>{
    console.log("listen port is 3030");
})

