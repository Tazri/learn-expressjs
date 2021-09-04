// create handler module
const handler = {};

// printError
handler.printError = (error)=>{
    // print the error in console
    console.log("|====> 🧨 There Was a Error 🧨 <====|\n");
    console.log(`🔖 Name : ${error.name}`);
    console.log(`📨  Message :  ${error.message}`);
    console.log("\n");
}

// export handler
module.exports = handler;