const questionSchema = require('../models/question');
const LikeSchema = require('../models/like');

module.exports.toggleLike = async (req, res) => {
    console.log(req._id)
    try {
        let deleted = false;
        let likeable;
        if (req.query.type == "Question") {
            //finding and populating likes field on schema of questions 
            likeable = await questionSchema.findById(req.query.id).populate('likes');
        }
        //check if like already there
        let exsistingLike = await LikeSchema.findOne({
            user: req.user.id,
            myPath: req.query.type,
            likeable: req.query.id
        })
        if (exsistingLike) {//if liked
            likeable.likes.pull(exsistingLike._id);
            likeable.save();
            exsistingLike.remove();
            deleted = true;
        }
        else {//if not liked make a new like
            let newLike = await LikeSchema.create({
                user: req.user._id,//user who liked
                likeable: req.query.id,//id of the question/comment
                myPath: req.query.type//type of the like
            })
            // console.log(likeable)
            likeable.likes.push(newLike._id);//pushing the id of the like to the post like field array
            likeable.save();
        }
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.json(500, {
            message: "Internal error"
        });
    }
}