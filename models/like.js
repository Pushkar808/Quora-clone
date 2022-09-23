const mongoose=require('mongoose');
const LikeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    //object id of the liked thing
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath:'myPath'//showing that this path is dynamic
    },
    // what is the objectid of the object
    myPath:{//dynamic path
        type:String,
        required:true,
        enum:['Question']//that means this can only store type of id as given
    }
},{
    timestamps:true
});

const Like=mongoose.model('Like',LikeSchema);
module.exports=Like;