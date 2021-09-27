// required packages
const express= require('express');
const expressLayouts = require('express-ejs-layouts');
const homeRoute= require('./routes/homeRoute');
const registerRoute= require('./routes/registerRoute')
const loginRoute= require('./routes/loginRoute')
const env= require('dotenv').config();
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const OAuth2 = google.auth.OAuth2;
const cookieParser = require('cookie-parser');
const CONFIG = require('./config');
const https = require('https');
const bodyParser= require('body-parser');
const session = require('express-session');

const port=process.env.PORT || 4000;
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout','./layouts/template1');
app.use(cookieParser());
app.use(express.json());

app.use(session({
    key:"project1",
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        
        maxAge: 1000*60*60  //session duration(1h)
         //accept cookies from the same domain
    }
}))

app.use("/",registerRoute);

app.listen(port, function(){
    console.log("sever is running on "+ port);
});


    