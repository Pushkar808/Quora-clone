const DB = require('./config/config');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const port = 8000;//port for server
const app = express();

//middlewares
app.use(cookieParser());



//setting template engine
app.set('view engine', 'ejs');
//setting where to find views for ejs
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);//using layouts in express
app.use(session({
    name: 'user_id',
    secret: 'clone',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: (1000 * 60 * 100) },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://localhost:27017/Quora_clone',
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )

}));


app.use(passport.initialize());
app.use(passport.session());
//setting the ejs login var to true is authenticated else false 
app.use(passport.setAuthenticatedUser)//find this on config/pass


app.use(express.static('./assets'));
// app.use(expressLayour)
app.set('layout expressStyles', true);
app.set('layout expressScript', true);
app.use(express.urlencoded());


//local server

//using routes folder all routes starting from '/'
app.use('/', require('./routes'));
app.listen(port, (err) => {
    if (err) {
        console.log("error in connecting to server");
    }
    console.log("Connected to server at port: " + port);
})