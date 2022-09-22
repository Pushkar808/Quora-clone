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
    }
},{
    timestamps: true
});
const Questions = mongoose.model('Questions', questionSchema);
module.exports = Questions;