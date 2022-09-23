const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    likes:[//array of likes for a question so that we know which users liked which posts 
        {//also this array length can help us to count the total likes
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps: true
});
const Questions = mongoose.model('Questions', questionSchema);
module.exports = Questions;