const express = require("express");
const app = express();

// locals and headersent
app.set("view engine","ejs");

// app.get("/",(req,res)=>{
//     console.log(res.headersSent);
//     res.render("page.ejs",{
//         name : "Md Tazri"
//     });
//     console.log(res.headersSent);
// });

// json end and send status and sendStatus
// app.get("/",(req,res)=>{
//     // res.end();
//     // res.send();

//     // res.json({
//     //     name: "bangladesh"
//     // });

//     // res.status(300);
//     // res.end();

//     res.sendStatus(403);

// })

// format
// app.get("/",(req,res)=>{
//     res.format({
//         "text/plain" : ()=>{
//             res.send("This is plain text");
//         },
//         "application/json" : ()=>{
//             res.json({message : "my name is Tazri"});
//         },
//         "text/html" : ()=>{
//             res.render("page",{
//                 name : "Md Tazri"
//             });
//         },
//         default : ()=>{
//             res.sendStatus(406);
//         }
//     })
// })

// cookie
// app.get("/",(req,res)=>{
//     res.cookie("name","bla bla bla");
//     res.end();
// })

// location , redirect, set and get
app.get("/test",(req,res)=>{
    res.send("This is text");
})

app.get("/",(req,res)=>{
    // res.location("/test");
    // res.set("Title","Md Tazri");
    // console.log(res.get("Title"));

    res.redirect("/test");
    res.end();
})

// listening port 
app.listen(3030,()=>{
    console.log("listening port is 3030");
})