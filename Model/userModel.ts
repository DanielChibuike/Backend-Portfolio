
import mongoose = require("mongoose");

interface IUser{

    name:string;
    email:string;
    password:string;
    role:string;
    profileImage?:string;
}

const userSChema = new mongoose.Schema<IUser>({


name:{
    type: String,
    required:true,
    trim:true
},

email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true
},
password:{
    type:String,
    required:true
},

role:{
    type:String,
    enum:["admin","user"],
    default:"user"
},
profileImage:{
    type:String,
    trim:true
},

},
{timestamps:true}
);

const User = mongoose.model("User",userSChema);
module.exports = User;
export{};