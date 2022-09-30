const nodeMailer =require('../config/nodemailer');

exports.sendOtp=(userMail,otp)=>{
    console.log(otp);
    nodeMailer.transporter.sendMail({
        from:'d20mca11046@cuchd.in',
        // to:data.user.email,
        to: userMail,
        subject:'OTP from Quora Clone',
        html:'<h1>is your'+otp+'OTP</h1>'
    },(err,info)=>{
        if(err){console.log("ERROR IN SENDING MAIL"+err);return false}
        console.log('message sent');
        return true;
    })
}