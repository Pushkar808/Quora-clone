const user = require('../models/user')

module.exports.indexSample = (req, res) => {
    let showLogout=false;
    if(req.isAuthenticated()){//if user is already authenticated then show logout button
        showLogout=true;
    }
    res.render('index',{
        showLogout:showLogout
    })
}
//showing login form
module.exports.LoginForm = (req, res) => {
    if(req.isAuthenticated()){//if user is already authenticated then don't show the form
        return res.redirect('/');
    }
    res.render('login')
}
//signin controller
module.exports.Signin = (req, res) => {
    user.find({ email: req.body.email, password: req.body.password }, (err, user) => {
        if (err) { console.log("ERROR In signin" + err); return; }
        if(user){
        console.log("Signed in success");
        return res.redirect('/',{
            login:true
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
module.exports.destroySession=(req,res)=>{
    req.logout((err)=>{
        if (err) { console.log("ERROR In Logging out user" + err); return done(err);}
        res.redirect('/');
    });
}