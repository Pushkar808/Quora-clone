const nodemailer=require('nodemailer');
const ejs=require('ejs')
const path=require('path')

//this is the main function responsible for sending emails
let transporter=nodemailer.createTransport({
    service: 'outlook',//email servive provider
    host: 'smtp-mail.outlook.com',//host of smtp server(can be found on internet)
    port: 587,//port of smtp server(can be found on internet)
    secure:false,
    auth:{//actual accaount from which mail has to be sent
        user:'yourmailhere',
        pass:'*******'
    }
});

//html template to be sent to the mail
let renderTemplate=(data,realtivePath)=>{
    let mailHtml;//var to store the HTML
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',realtivePath),//path where is the ejs file located that is to be sent
        data,
        function(err,template){
            if(err){console.log("error in template of mail")}
            mailHtml=template;
        }
    )
    return mailHtml;
}


module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}