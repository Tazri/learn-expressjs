const express = require("express");
const multer = require("multer");
const path = require('path');

// file upload folder
const UPLOAD_FOLDER = "./uploads/";

// storage 
let storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,UPLOAD_FOLDER);
    },
    filename : (req,file,cb)=>{
        // rename the file
        let extName = path.extname(file.originalname);
        let fileName = file.originalname
                            .replace(extName,"")
                            .toLowerCase()
                            .split(" ")
                            .join("-") + "-" + Date.now();
        
        cb(null,fileName+extName);
    }
});

// perameter for multer object and ready to create middleware
const upload = multer({
    // dest : UPLOAD_FOLDER, for only define the folder
    storage : storage,
    limits : {
        fileSize : 1000000, // 1MB
    },
    fileFilter : (req,file,cb)=>{
        if(file.mimetype === "image/png"||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"){
            cb(null,true);
        }else{
            cb(new Error("The file must be png jpg or jpeg"));
        }
    }
})

// create app
const app = express();

// application route
// app.post("/",upload.fields([
//     {name : "avater", maxCount: 1},
//     {name : "gallery", maxCount: 2}
// ]),(req,res)=>{

//     res.send("all ok");
// })

app.post("/",upload.single("avater"),(req,res)=>{
    console.log(req.file);
    res.send("all ok");
});


// error handling
app.use((error,req,res,next)=>{
    // if error exist
    if(!error){
        res.send("Success!");
    }

    if(error instanceof multer.MulterError){
        res.status(500).send("There was a upload error!");
    }

    res.status(500).send(error.message);
})

// listen the app
app.listen(3030,()=>{
    console.log("app is litening on port 3030.");
    console.log("\n\n\n");
    console.log("link :: http://localhost:3030/");
});