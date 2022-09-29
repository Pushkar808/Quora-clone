const questionSchema = require('../models/question');
module.exports.ask = (req, res) => {
    // console.log("OK")
    res.render('question.ejs');
}
module.exports.submitquestion = async (req, res) => {
    let question = await questionSchema.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id
    }, (err, question) => {
        if (err) { console.log("ERROR In signup" + err); return; }
        res.render('question')
    })

}
function getQuestion(id,res) {
    questionSchema.find({ user: id }).exec((err, myQuestions) => {
        if (err) { console.log("error in getting ques: " + err); return; }
        return res.render('myquestion', {
            questions: myQuestions
        });
    });
}

module.exports.myquestions = async (req, res) => {
    getQuestion(req.user._id,res);
}

module.exports.getuserquestion = async (req, res) => {
    getQuestion(req.query.id,res);
}

module.exports.getfullQues = (req, res) => {
    try {

        questionSchema.findById(req.query.id)
            .sort('-createdAt')
            .populate('user')
            .populate('comments')
            .populate('comments.user[0]')
            .exec((err, question) => {
                if (err) { console.log("ERROR In fetching questions" + err); return; }
                // console.log(question)

                return res.render('full_question', {
                    question: question,
                    current_user: req.user
                })
            })
    } catch (err) {
        console.log("ERROR FOUND: " + err);
        return;
    }
}

