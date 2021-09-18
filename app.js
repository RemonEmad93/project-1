// required packages
const express= require('express');
const expressLayouts = require('express-ejs-layouts');

//constant variables/objects
const port=process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout','./layouts/template1');

app.get('/', function(req, res) {
    res.render('home', {isHomejs:true});
});

app.listen(port, function(){
    console.log("sever is running");
});