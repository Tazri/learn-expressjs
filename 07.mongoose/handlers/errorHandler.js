// create handler module
const handler = {};

// printError
handler.printError = (error)=>{
    // print the error in console
    console.log("|====> ๐งจ There Was a Error ๐งจ <====|\n");
    console.log(`๐ Name : ${error.name}`);
    console.log(`๐จ  Message :  ${error.message}`);
    console.log("\n");
}

// export handler
module.exports = handler;