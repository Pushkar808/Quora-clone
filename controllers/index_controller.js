module.exports.indexSample=(req,res)=>{
    console.log("index")
    res.render('index')
}
module.exports.LoginForm=(req,res)=>{
    console.log("OK")
    res.render('login')
}