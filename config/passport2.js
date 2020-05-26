const localStrategy=require('passport-local').Strategy;
const bcrypt=require("bcryptjs");
const monogoose=require("mongoose");

//local a schema model
const User=require("../Model/auth");

module.exports =(passport)=>{
    passport.use(new localStrategy({usernameField:'email'},(email,pwd,done)=>{

    User.findOne
    ({email:email})
    .then((user)=>{
        if(!user){
            return done(null,false,
                {message:'no email found please register 1st',
        });
        }
        //match password
        bcrypt.compare(pwd,user.pwd,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                return done(null,user,{message:'login Successfull'});
            }else{
                return done(null,false,{message:"password is not match"});
            }
        });

    })
    .catch((err)=>Console.log(err));
       
    })
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
};