const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;//port for server
const app = express();

//middlewares




//setting template engine
app.set('view engine', 'ejs');
//setting where to find views for ejs
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);//using layouts in express
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