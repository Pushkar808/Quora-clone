const userSchema = require('../models/user')
const followSchema = require('../models/followers')
const Commentschema=require('../models/comments')
module.exports.showProfile = async (req, res) => {
    //finding user then inside it finding if the query.id user is followed by req.user or not 
    try {
         await userSchema.findById(req.query.id, async (err, users) => {
            let follower = await followSchema.find({ from_user: req.user._id, to_user: req.query.id })
            let comments=await  Commentschema.find({ user: req.query.id }).populate('question');
            let isFollowed = false;//to send if this user has been followed or not
            if (follower.length != 0)
                isFollowed = true;
            res.render('profile', {
                userdetails: users,
                isfollowed: isFollowed,
                comments: comments
            });
        })
    } catch (err) {
        console.log("SOME ERR:" + err)
        return;
    }

}