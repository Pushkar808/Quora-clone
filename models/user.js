const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    follower:[{//user._id of the user followed by this user
        type:mongoose.Schema.Types.ObjectId,
        ref:'followers'
    }]
},{timestamps:true});
const User=mongoose.model('Users',userSchema);
module.exports=User;