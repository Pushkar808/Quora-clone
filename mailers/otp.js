const nodeMailer =require('../config/nodemailer');

exports.sendOtp=(userMail,username,otp)=>{
    let htmlString=nodeMailer.renderTemplate({otp:otp,username:username},'/otp_mail.ejs')
    nodeMailer.transporter.sendMail({
        from:'d20mca11046@cuchd.in',
        to: userMail,
        subject:'OTP from Quora Clone',
        html:htmlString
    },(err,info)=>{
        if(err){console.log("ERROR IN SENDING MAIL"+err);return false}
        console.log('message sent');
        return true;
    })
}