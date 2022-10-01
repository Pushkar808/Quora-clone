const user = require('../models/user')
const questionSchema = require('../models/question')
const otpMailer = require('../mailers/otp');
const cookieParser = require('cookie-parser');
module.exports.indexSample = (req, res) => {
    let showLogout = false;
    if (req.isAuthenticated()) {//if user is already authenticated then show logout button
        showLogout = true;
    }
    try {
        questionSchema.find({})
            .sort('-createdAt')
            .populate('user')
            .exec((err, questions) => {
                if (err) { console.log("ERROR In fetching questions" + err); return; }
                return res.render('index', {
                    questions: questions,
                    showLogout: showLogout
                })
            })
    } catch (err) {
        console.log("ERROR FOUND: " + err);
        return;
    }
}
//showing login form
module.exports.LoginForm = (req, res) => {
    if (req.isAuthenticated()) {//if user is already authenticated then don't show the form
        return res.redirect('/');
    }
    res.render('login')
}
//signin controller
module.exports.Signin = (req, res) => {
    user.find({ email: req.body.email, password: req.body.password }, (err, user) => {
        if (err) { console.log("ERROR In signin" + err); return; }
        if (user) {
            console.log("Signed in success");
            return res.redirect('/', {
                login: true
            })//if sigin success go to this
        }
        return res.redirect('back');//else go here
    });
}
//creating user after signup
module.exports.Signup = async (req, res) => {
    //if confirm password or email mismatch
    if (req.body.email != req.body.cemail || req.body.password != req.body.cpassword) {
        console.log("Password/Email mismatch")//hve to show it on flash
        res.render('login')
    }
    //creating user
    let signedUp = await user.create({
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname
    }, (err, user) => {
        if (err) { console.log("ERROR In signup" + err); return; }
        res.render('login')
    });

}

//creating session for a particular user

module.exports.createSession = (req, res) => {
    console.log("Session created");
    user.findOne({ email: req.body.email }, (err, user) => {
        if (err) { console.log("ERROR In finding user in passport config" + err); return done(err); }
        //if user has been there then
        if (user) {
            if (req.body.password != user.password)//if password mismatch
            {
                console.log("Wrong username/password");
                return;
            }
            res.cookie('user_id', user._id);
            res.redirect('/');
        }

    });
}

//Logut button
module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if (err) { console.log("ERROR In Logging out user" + err); return done(err); }
        res.redirect('/');
    });
}

module.exports.forgotPass = (req, res) => {
    res.render('forgotPass', {
        userFound: true
    })
}
module.exports.newPass = (req, res) => {
    res.render('newPass');
}

var get_cookies = function (request) {
    var cookies = {};
    request.headers && request.headers.cookie.split(';').forEach(function (cookie) {
        var parts = cookie.match(/(.*?)=(.*)$/)
        cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
    return cookies;
};
module.exports.changePass = async (req, res) => {
    const password = req.body.password;
    console.log(password);
    const update = { password: password };
    const cookie=get_cookies(req)['user_id'];
    let doc=await user.findOneAndUpdate({id:cookie},update,{new:true});
    res.redirect('/login')
}


module.exports.sendOTP = (req, res) => {
    console.log(req.body.email)
    user.findOne({ email: req.body.email }, (err, user) => {
        console.log("ok")
        if (err) {
            console.log("ERROR In finding user in passport config" + err);
            return;
        }
        //if user has been there then
        if (user) {
            let otp = Math.floor(1000 + Math.random() * 9000);;
            let is_mailSent = otpMailer.sendOtp(req.body.email,user.fullname,otp);//send mail to the user
            module.exports.getotp = () => {
                return otp;
            }//so that it can be used by other files also
            res.cookie('user_id', user._id);//setting cookie for the user
            res.render('otpform', {//if mailis sent the  render the form to input OTP
                userFound: is_mailSent,
                isOtpcorrect: false,//so that we can render input form for otp once
                checkAgain: false
            })
        }
        else {
            return res.render('forgotPass', {
                userFound: is_mailSent
            });
        }
    });
}


module.exports.checkOTP = (req, res) => {
    let otp = this.getotp();
    if (req.body.otp == otp) {
        //here checkagain is used to show error if otp is incorrent
        res.redirect('/newPass');
    }
    else {
        res.render('otpform', { isOtpcorrect: false, checkAgain: true });
    }
}
