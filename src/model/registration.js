 const mongoose= require("mongoose");
 const bcrypt = require("bcrypt");

 const accountRegister = new mongoose.Schema({
    fullname :{
                type: String,
                require: true
              },
    email: {
              type: String,
              require: true,
              unique: true
           },
    mobile: {
              type: Number,
              min: 10,
              require: true,
              unique: true
            },
    password:{
                type:String,
                require: true 
             },
    conformPassword : {
                      type:String,
                      require: true 
                      }

 })

 accountRegister.pre("save", async function(next){

   if(this.isModified("password")){
      console.log(`the current password is ${this.password}`);
      this.password= await bcrypt.hash(this.password, 10);
      console.log(`now current password is ${this.password}`);

      this.conformPassword= undefined;
   }
 })

 const Registeration = new mongoose.model("Register", accountRegister);


 module.exports = Registeration;