const express = require("express");

const app = express();

// app locals
app.locals.myName = "blabla blabla";

const admit = express();

// mountpath
admit.get("/",(req,res)=>{
    console.log(admit.mountpath);
    res.send("this is admit");
})

// when admit is mounted
// admit.on("mount",(parent)=>{
//     console.log(parent);
//     console.log("admit is mounted");
// })

// app.use("/admit",admit);

// app.get("/",(req,res)=>{
//     console.log(app.mountpath);
//     res.send("this main get");
// });

// app.all("/blabla",(req,res)=>{
//     console.log("this is for all");
//     res.send("this is bla bla bla ");
// })

// enable case sensative
// app.enable("case sensitive routing");

// disable case sensative
// app.disable("case sensitive routing");

// set my setting in app
// app.set("title","my site");

// app.get("/about",(req,res)=>{
//     // console.log(app.enabled("case sensitive routing"));
//     // console.log(app.disabled("case sensitive routing"));
//     console.log(app.get("title"));
//     res.send("This is small about");
// })

// app.get("/About",(req,res)=>{
//     res.send("This is big about.");
// })

// // param function
// app.param("id",(req,res,next,id)=>{
//     let user = {
//         "Name" : "Md Tazri",
//         id
//     }

//     req.userDetails = user;
//     next();
// })

// app.get("/user/:id",(req,res)=>{
//     res.send(req.userDetails);
// });

// use of route
// app.route("/admit/me")
//     .get((req,res)=>{
//         res.send("This is GET");
//     })
//     .post((req,res)=>{
//         res.send("This is POST");
//     })
//     .delete((req,res)=>{
//         res.send("This is DELETE");
//     })
//     .put((req,res)=>{
//         res.send("This is PUT");
//     })
//     .patch((req,res)=>{
//         res.send("This is PATCH");
//     })

app.set("view engine","ejs");

app.all("/",(req,res)=>{
    res.render("pages/index");
})

app.listen(3030,()=>{
    console.log("server is listining on prot 3030");
});