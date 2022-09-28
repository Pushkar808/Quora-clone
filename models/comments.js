const mongoose=require('mongoose');
const Commentschema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    username:{
        type:String,
        required:true
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps:true
});
const Comments=mongoose.model("Comments",Commentschema);
module.exports=Comments;