const userSchema = require('../models/user')
module.exports.showProfile = async (req, res) => {
    let user = await userSchema.findById(req.query.id);
    res.render('profile', {
        userdetails: user
    });
}