const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://ecom:Anand@clusterecom.46lscee.mongodb.net/loginRegistration").then(()=>{
    console.log("connection successfull with database ");
}).catch((e)=>{
    console.log(`no connection`);
})