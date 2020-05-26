const express=require('express');
const exhbs=require('express-handlebars');
require("dotenv").config();
const mongoose = require("mongoose");
const app=express();
const passport=require('passport');
let port = process.env.PORT || 3399;

mongoose.connect(
    process.env.mongourl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err) =>{
        if (err) throw err;
        console.log(`Db Connect `);
    }
);

// Locall Passport Module

 require('./config/passport2')(passport)

 app.use(passport.initialize());
 app.use(passport.session())   

//express handlebars middleware
app.engine("handlebars", exhbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => res.render("home",{title:"Home"}));
app.get("/reg", (req, res) => res.render('./auth/reg',{title:"Registration Home"}));

app.use('/public',express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public"));
app.use('/cdn',express.static(__dirname + "/public"));

const auth=require('./router/authroute');
const restudent=require('./router/restudentroute');
app.use('/Restaurants',restudent);
app.use('/authentication',auth);


app.get("/membership/ghsourav/gold", (req, res) => res.render("gold",{title:"Gold"}));
app.get("**", (req, res) => res.render("404",{title:"Page not Found "}));

app.listen(port, (err) => {
if (err) throw err;
  console.log("app is running on port number " + port);
});


