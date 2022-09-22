const questionSchema = require('../models/question');
module.exports.ask = (req, res) => {
    console.log("OK")
    res.render('question.ejs');
}
module.exports.submitquestion = async (req, res) => {
    console.log(req.body);
    let question = await questionSchema.create({
        title: req.body.title,
        description: req.body.description,
        user:req.user._id
    }, (err, question) => {
        if (err) { console.log("ERROR In signup" + err); return; }
        res.render('question')
    })

}


