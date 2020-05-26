const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require('passport')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
router.use(bodyParser.urlencoded({ extended: true }));
//------Get Route Start Here-----//



router.get("/register", (req, res) => res.render("./auth/reg",{title:"Register "}));
router.get("/login", (req, res) => res.render("./auth/login",{title:"Login"}));

router.get("/re/register", (req, res) => res.render("./auth/reg",{title:"Re-Register "}));
router.get("/re/login", (req, res) => res.render("./auth/login",{title:"Login"}));

//------Get Route End Here-----//


//-----Post Rout Start Here------//
router.post('/register', (req,res)=> {
    let errors =[];
    let {uname,email,pwd,c_pwd}=req.body;
    if(uname.length<1){
        errors.push({text:"username is Mandatory"});
    }
    if(pwd!=c_pwd){
        errors.push({text:"Password Shoud Match"});
    }
  //  if(pwd.lenth <6){
  //      errors.push({text:"Password Shoud be Minimum 6 Chareter"});
  //  }
    if(errors.length >0) {
        res.redirect('/authentication/re/Register',{
            errors,
            uname,
            email,
            pwd,
            c_pwd,
        });
    
    }else{
        User.findOne({email})
        .then((user) => {
            if (user) {
                //req.flash("errorss_msg","Email Alreay Usded");
                res.redirect("/authentication/re/Register",401,{});
            } else {
                let newUser =new User({
                    uname,
                    pwd,
                    email,
                });
                //Password hashing
                bcrypt.genSalt(12,(err,salt) => {
                    bcrypt.hash(newUser.pwd, salt,(err,hash) =>{
                        newUser.pwd =hash;

                        console.log(hash)

                        //To save pwd into Hasing

                        newUser
                        .save()
                        .then((user) => {
                           // req.flash("success_msg","Succsesfully Register");

                        });
                        res.redirect("/authentication/re/login",201,{user},{success_msg:"Done"});
                    })
                })
            }
        })
        .catch((err) => console.log(err));
    }
    

});



///----------Login Post Route Start Here-----/// 

router.get('/login',(req,res)=>{
     passport.authenticate("local",{
         successRedirect:"/dashboard",
         failureRedirect:"/authentication/re/login",
         failureFlash: true
     }) (req,res,next);
})


///----------Login Post Route End Here-----/// 

router.get("/logout",(req,res)=>{
    req.logOut();
    req.flash('success_msg',"successfully loggedout!");
    res.redirect("/auth/login",201,{});
});



require("../Model/auth");
const User=mongoose.model("User");
//-----Post Rout End Here------//

module.exports=router;
