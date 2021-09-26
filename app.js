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


// const {OAuth2Client} = require('google-auth-library');
// const passport= require('passport');


// const findOrCreate= require('mongoose-findorcreate');
// const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");




// const client = new OAuth2Client(process.env.clientId);

//constant variables/objects
const port=process.env.PORT || 4000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout','./layouts/template1');
app.use(cookieParser());
app.use(express.json());





// app.use(passport.session())
// mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
// mongoose.set("useCreateIndex", true);
// const userSchema= new mongoose.Schema({
//   email: String,
//   password: String,
//   googleId: String,
//   secret: String
// })
// userSchema.plugin(findOrCreate);
// const user= new mongoose.model("User", userSchema);
// passport.use(User.createStrategy())
// require('./signin');
// app.use(passport.initialize())



// app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//   console.log("done")
//   res.render('login');
//   res.end('Logged in!');
  
// })

// app.post('/login',function(req,res){
//   let token= req.body.token;

//   async function verify() {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.clientId
//     });
//     const payload = ticket.getPayload();
//     const userid = payload['sub'];
//     console.log(payload);
//   }
//   verify()
//   .then(()=>{
//       res.cookie('session-token', token);
//       res.send('success')
//   })
//   .catch(console.error);

//   console.log(token);  
// res.render("login")
    
// })

// app.post('/home',function(req,res){
//     res.render("home")
// })

// app.get('/',function(req, res){
//   res.render('signin')
// })


// app.get('/', function (req, res) {
//   // Create an OAuth2 client object from the credentials in our config file
//   const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);

//   // Obtain the google login link to which we'll send our users to give us access
//   const loginLink = oauth2Client.generateAuthUrl({
//     access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
//     scope: CONFIG.oauth2Credentials.scopes // Using the access scopes from our config file
//   });
//   return res.render("index", { loginLink: loginLink });
// });


// app.get('/auth_callback', function (req, res) {
//   // Create an OAuth2 client object from the credentials in our config file
//   const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);

//   if (req.query.error) {
//       // The user did not give us permission.
//       return res.redirect('/');
//   } else {
//       oauth2Client.getToken(req.query.code, function(err, token) {
//       if (err)
//           return res.redirect('/');
      
//       // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
//       res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
//       return res.redirect('/get_some_data');
//       });
//   }
// });

// app.get('/get_some_data', function (req, res) {
//   if (!req.cookies.jwt) {
//     // We haven't logged in
//     return res.redirect('/');
//   }
//   // Create an OAuth2 client object from the credentials in our config file
//   const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
//   // Add this specific user's credentials to our OAuth2 client
//   oauth2Client.credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);
//   // Get the youtube service
//   const service = google.userinfo('v2');
//   // Get five of the user's subscriptions (the channels they're subscribed to)
//   service.subscriptions.list({
//     auth: oauth2Client,
//     mine: true,
//     part: 'snippet,contentDetails',
//     maxResults: 5
//   }).then(response => {
//     // Render the data view, passing the subscriptions to it

//     return res.render('data', { subscriptions: response.data.items });
//   });
// });

// app.get('/get_some_data',function (req,res) {
//   if (!req.cookies.jwt) {
//     // We haven't logged in
//     return res.redirect('/');
//   }
//   // Create an OAuth2 client object from the credentials in our config file
//   const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
//   // Add this specific user's credentials to our OAuth2 client
//   oauth2Client.credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);

//   var oauth2 = google.oauth2({
//     auth: oauth2Client,
//     version: 'v2'
//   });
//   oauth2.userinfo.get(function(err, response) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(response);
//       return res.render('data', { subscriptions: response });
//     }
//   });
  
// })


app.use("/",registerRoute);

app.listen(port, function(){
    console.log("sever is running on "+ port);
});


    