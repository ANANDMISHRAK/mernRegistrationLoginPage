 const express = require("express");
 const app = express();
 const path = require("path");
 const hbs = require("hbs");
  require("./db/conn");
 const Registeration= require("./model/registration");
 const port = process.env.PORT || 8000;

 //const url = require("url");

 const bcrypt= require("bcrypt");

const statics_path = path.join(__dirname,"../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.static(statics_path));
app.use(express.json());
//line 16 for take data fron web page 
app.use(express.urlencoded({extended:false}));

app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);


app.get("/", (req , res)=>{
   // res.send("hi from home page");
   res.render("index");

})

app.post("/index",async (req, res)=>{
try{
   console.log(req.body.username);
   const pass= req.body.password;
   const conpass= req.body.conformpassword;

   if(pass === conpass)
  {
    const registerAccont = new Registeration({
        fullname : req.body.username,
        email : req.body.email,
        mobile : req.body.mobile,
        password: req.body.password,
        conformpassword : req.body.conformpassword
    })
    const register = await registerAccont.save();
    res.status(201).render("index");
    
   }
  else{
       res.status(400).send("password & conform password not match");
     }

}
catch(e){
    res.status(400).send(e);
}
})

// for log in page 

//app.get("/login",(req , res)=>{
//    res.render("login")
//})
app.post("/login", async(req, res)=>{
 try{
    const email= req.body.Lemail;
    const password= req.body.Lpassword;
   // console.log(`${email} & paaword ${password}`);
  
   const userdata = await Registeration.findOne({email: email});


   const isMatch = await bcrypt.compare(password, userdata.password)

   //if(userdata.password===password)

   if(isMatch)
   {
    
    res.status(201).sendFile(path.join(__dirname , '/loginhtmlpage.html'));
   }
  else{
    res.send("password is not match");
  }
 }
 catch(e){
       res.status(400).send(" INvalid Email");
    }
})

app.listen(port, ()=>{
    console.log(`page show at port no : ${port}`);
})
