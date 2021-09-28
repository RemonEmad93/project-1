// required packages
const express= require('express');
const expressLayouts = require('express-ejs-layouts');
const homeRoute= require('./routes/homeRoute');
const env= require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser= require('body-parser');
const session = require('express-session');

const port=process.env.PORT || 4000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout','./layouts/mainlayout');
app.use(cookieParser());
app.use(express.json());
app.use(session({
    key:"project1",
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000*60*60  //session duration(1h)
    }
}))

app.use('/',homeRoute);

app.listen(port, function(){
    console.log("sever is running on "+ port);
});


    