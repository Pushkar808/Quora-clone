const Commentschema = require('../models/comments');
const questionSchema = require('../models/question');
module.exports.addComment = async (req, res) => { //adding comments
    console.log("Comment added");
    const new_comment = await Commentschema.create({
        content: req.body.comment,
        user: req.user._id,
        question: req.query.id,
        username: req.user.fullname
    });
    const question = await questionSchema.findById(req.query.id).populate('comments');
    // console.log(question);
    question.comments.push(new_comment);
    question.save()
    res.redirect('back')
}


//module to remove the comment
module.exports.deletecomment = (req, res) => {
    Commentschema.findById(req.query.id, (err, comment) => {
        if (comment.user.equals(req.user._id)) {//if user is same who is requested and signin
            questionSchema.findById(comment.question, (err, question) => {
                question.comments.pull(req.query.id);
                question.save();
                comment.remove();
            })//finding question as we have to delete comments from there also
            res.redirect('back');
        }
        else {
            console.log("USerd differnet")
        }
    });
}