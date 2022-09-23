const questionSchema = require('../models/question');
module.exports.ask = (req, res) => {
    console.log("OK")
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


module.exports.myquestions = async (req, res) => {
    
    let myQuestions =  questionSchema.find({user:req.user._id}).exec((err,myQuestions)=>{
        if(err){console.log("error in getting ques: "+err);return;}
       return res.render('myquestion', {
                    questions: myQuestions
                });
    });
}