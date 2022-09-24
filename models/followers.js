const mongoose=require('mongoose');
const followerSchema=mongoose.Schema({
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true});
const follower=mongoose.model('followers',followerSchema);
module.exports=follower;