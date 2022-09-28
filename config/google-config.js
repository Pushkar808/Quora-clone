const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// clientID: '704062121952-am7t53m8nrnsg997mjq20h9e1jh1n4cv.apps.googleusercontent.com',
// clientSecret: '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',
// callbackURL: 'http://localhost:8000/login'
// tell passport to use a new strategy for google login
passport.use(
    new googleStrategy({
    clientID: '75755010585-5ku8jpg06aic37cilgdt63ecuoe7abqe.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/auth/google/callback',
},function (accessToken, refreshToken, profile, done) {
        // find a user
        console.log(profile)
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log('error in google strategy-passport', err); return; }
            // console.log(accessToken, refreshToken);
            // console.log(profile);
            // console.log(user);
            if (user) {
                // if found, set this user as req.user
                return done(null, user);
            } else {
                // if not found, create the user and set it as req.user
                User.create({
                    fullname: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) { console.log('error in creating user google strategy-passport', err); return; }

                    return done(null, user);
                });
            }

        });
    }


));


module.exports = passport;
