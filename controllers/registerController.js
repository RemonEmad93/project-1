const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const OAuth2 = google.auth.OAuth2;
const CONFIG = require('../config');
const sql = require("mssql/msnodesqlv8");
const sqlcon= require('../config/sqlConnection');

const bcrypt = require('bcrypt'); // used for encryption of passwords

const saltRounds = 10;  //used in encryption of passwords


//google auth & render the sign up page
const register_get= (req,res)=>{
    // Create an OAuth2 client object from the credentials in our config file
    const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
    // Obtain the google login link to which we'll send our users to give us access
    const loginLink = oauth2Client.generateAuthUrl({
      access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
      scope: CONFIG.oauth2Credentials.scopes // Using the access scopes from our config file
    });

    return res.render("register", { loginLink: loginLink, username:" ",signup:'', login:"login",logout:""});
}

//google auth & sign up with google
const google_get=(req, res)=>{
    // Create an OAuth2 client object from the credentials in our config file
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);

  if (req.query.error) { 
      // The user did not give us permission.
      return res.redirect('/');
    }else {
      oauth2Client.getToken(req.query.code, function(err, token) {
      if (err)
        return res.redirect('/');
      
      // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
      res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
      return res.redirect('/checkEmail');
      });
    }
}

//check google email then render home page
const check_email=(req,res)=>{
  var session = req.session;

  if (!req.cookies.jwt) {
      // We haven't logged in
      return res.redirect('/');
    }
    // Create an OAuth2 client object from the credentials in our config file
    const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
    // Add this specific user's credentials to our OAuth2 client
    oauth2Client.credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);
  
    var oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    });
    oauth2.userinfo.get(function(err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(response);

        var request= new sql.Request();

        request.input("username",sql.NVarChar,response.data.name)
        request.input("email",sql.NVarChar,response.data.email)
        request.input("photo",sql.NVarChar,response.data.picture)

        //check if aleardy registered with google
        request.query('select Email from accounts where Email=@email',(err,result)=>{
            if(result.recordset.length!=0)
            {
              req.flash('message', 'already registered');
              session.userid=response.data.name
              return res.redirect('/')
            }
            else{
              request.query("insert into accounts(UserName, ImagePath, Email) values(@username, @photo , @email)",(err)=>{
                  if(err)
                  {
                      console.log(err.message)
                  }
                  else{
                    session.userid=response.data.name
                    req.flash('message', 'registered successfully');
                    return res.redirect('/' );
                  }
              })
            }
        })
      }
    });
}

//normal register without google account then render home page
const register_without_google=(req, res)=>{
  var request= new sql.Request();
    var session = req.session;

    request.input("email",sql.NVarChar,req.body.email)
    request.input("password",sql.NVarChar,bcrypt.hashSync(req.body.password, saltRounds, function(err, hash) {
        return hash
    }))
    request.input("username",sql.NVarChar,req.body.username)
    
    //check if aleardy registered
    request.query('select Email from accounts where Email=@email',(err,result)=>{
        if(result.recordset.length!=0)
        {
          
          req.flash('message', 'already registered');
          return res.render('login',{message:req.flash('message'),username:" ",signup:'sign up', login:"",logout:""})
        }
        else{
          request.query("insert into accounts(Email, Password, UserName) values(@email, @password, @username )",(err)=>{
              if(err)
              {
                console.log(err.message)
              }
              else{
                session.userid=req.body.username
                req.flash('message', 'registered successfully');
                return res.redirect('/');
              }
          })
        }
    })
}


module.exports={
    register_get,
    google_get,
    check_email,
    register_without_google
}