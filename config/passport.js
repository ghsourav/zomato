const LocalStrategy= require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport=require('passport')

//--Load Schema Model

const User = require('../Model/auth');


//*module.exports =(passport) => {
    passport.use(
        new LocalStrategy({usernameField:"email"},(email,pwd,done)=>{
            User.findOne({email:email}).then(user => {
                if (!user) {
                    return done(null,false,
                        {message:"No Email Found"})
                }
            })
            //Match Password

            bcrypt.compare(pwd,user.pwd,(err,isMatch)=>{
                if (err) throw err;
                if (isMatch) {
                    return done(null,true,{message:'Login Successfull'});
                }
                else{
                    return done(null,true,{message:'Login UnSuccessfull'});
                }
            
});

        })

       .catch((err)=> console.log(err)));



    


    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });