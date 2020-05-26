const {Schema,model} = require("mongoose");

const UserSchema = new Schema(
    {
        uname:{
            type:String,
            unique:true,
        },
        email:{
            type: String,
            unique:true,
        },
        pwd:{
            type:String,

        }

    },

    //{timestamps}
)

module.exports= model("User",UserSchema);

