const DB = require('./config/config');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const passportGoogle = require('./config/google-config');
const port = 8000;//port for server
const app = express();


//adding sockets

const chatServer = require('http').Server(app);
const serverSocket = require('./config/socket_config').chatSockets(chatServer);
chatServer.listen(5555);
console.log("chat server is running on port 5000")//can give any port number other than server's

//middlewares
app.use(cookieParser());
app.use(express.urlencoded());


//setting template engine
app.set('view engine', 'ejs');
//setting where to find views for ejs
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    name: 'user_id',
    secret: 'clone',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: (1000 * 60 * 100) },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost:27017/Quora_clone',
            autoRemove: 'disabled'

        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )

}));


app.use(passport.initialize());
app.use(passport.session());
//setting the ejs login var to true is authenticated else false 
app.use(passport.setAuthenticatedUser)//find this on config/pass


app.use(express.static('./assets'));
app.use(expressLayouts)
app.set('layout extractStyles', true);
app.set("layout extractScript", true)



//local server

//using routes folder all routes starting from '/'
app.use('/', require('./routes'));
app.listen(port, (err) => {
    if (err) {
        console.log("error in connecting to server");
    }
    console.log("Connected to server at port: " + port);
})