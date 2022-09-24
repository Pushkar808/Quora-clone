const followSchema = require('../models/followers');
const userSchema = require('../models/user');

module.exports.followUser = async (req, res) => {
    if (req.user._id != req.query.id) {
        try {
            let userFound = await followSchema.find({ from_user: req.user._id, to_user: req.query.id });
            let user = await userSchema.findById(req.user._id);
            if (userFound.length != 0) {//if user found i.e already followed then unfollow
                user=await user.populate('follower');
                console.log("REMOVE")
                //getting this user followed id 
                user.follower.pull(userFound[0]._id);
                user.save();
                userFound[0].remove();
                res.redirect('back');
            }
            else {//user is not found i.e follow
                console.log("ADD")   
                let newfollow = await followSchema.create({
                    from_user: req.user._id,
                    to_user: req.query.id
                });
                //pushing the followed person id in the table 
                user.follower.push(newfollow._id);
                user.save();
                res.redirect('back');
            }
        } catch (err) {
            console.log("ERROR IN FINDING USER " + err);
            return;
        }
    }
}