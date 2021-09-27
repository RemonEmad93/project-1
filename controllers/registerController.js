const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const OAuth2 = google.auth.OAuth2;
const CONFIG = require('../config');
const sql = require("mssql/msnodesqlv8");
const sqlcon= require('../config/sqlConnection');
const alert = require('alert'); 
const bcrypt = require('bcrypt');

const saltRounds = 10;
var googleres=" ";


const home_page=(req, res)=>{
  var session = req.session
  console.log(session.userid)
  if(session.userid){
    res.render('home',{username:session.userid})

  }
  else{
    res.render('home',{username:' '})

  }
}

//google auth
const register_get= (req,res)=>{
    // Create an OAuth2 client object from the credentials in our config file
    const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);

    // Obtain the google login link to which we'll send our users to give us access
    const loginLink = oauth2Client.generateAuthUrl({
      access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
      scope: CONFIG.oauth2Credentials.scopes // Using the access scopes from our config file
    });
    return res.render("register", { loginLink: loginLink, username:" "});
}

//google auth
const google_get=(req, res)=>{
    // Create an OAuth2 client object from the credentials in our config file
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);

  if (req.query.error) {
      // The user did not give us permission.
      return res.redirect('/');
  } else {
      oauth2Client.getToken(req.query.code, function(err, token) {
      if (err)
          return res.redirect('/');
      
      // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
      res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
      return res.redirect('/home');
      });
  }
}


const login_get=(req, res)=>{
    res.render('login' ,{username:" "})
}

//create new account
const login_post=(req, res)=>{
    var request= new sql.Request();
    var session = req.session;

    request.input("email",sql.NVarChar,req.body.email)
    request.input("password",sql.NVarChar,bcrypt.hashSync(req.body.password, saltRounds, function(err, hash) {
        console.log(hash);
        return hash
    }))
    request.input("username",sql.NVarChar,req.body.username)
    

    request.query('select Email from accounts where Email=@email',(err,result)=>{
        if(result.recordset.length!=0)
        {
          console.log("error")

          alert('already registered');
          return res.render('login',{username:" "})
          
        }
        else{
          request.query("insert into accounts(Email, Password, UserName) values(@email, @password, @username )",(err)=>{
              if(err)
              {
                  console.log(err.message)
              }
              else{
                session.userid=req.body.username
                const username= req.body.username
                console.log(req.session)
                return res.redirect('/');
              }
          })
        }
    })

}

//register with google
const home_get=(req,res)=>{
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

          request.query('select Email from accounts where Email=@email',(err,result)=>{
              if(result.recordset.length!=0)
              {
                console.log("error")

                alert('done');
                return res.render('login',{username:" "})
                
              }
              else{
                request.query("insert into accounts(UserName, ImagePath, Email) values(@username, @photo , @email)",(err)=>{
                    if(err)
                    {
                        console.log(err.message)
                    }
                    else{
                      session.userid=response.data.name
                      console.log(req.session)
                      const username= response.data.name
                      googleres=response
                      return res.redirect('/' );
                    }
                })
              }
          })
        }
      });
}

//login
const home_post=(req, res)=>{
  var session=req.session
    var request= new sql.Request();
    console.log(req.body.password)
    request.input("email",sql.NVarChar,req.body.email)
    request.input("password",sql.NVarChar,req.body.password)
    

    request.query('select Email, Password, UserName from accounts where Email=@email ',(err,result)=>{
        console.log('done')
        if(result.recordset.length!=0)
        {
            console.log('done1')
        
        bcrypt.compare(req.body.password, result.recordset[0].Password, function (err, isValid) {
           
            console.log('done2', isValid)

                if(isValid){
                    console.log('done3')
                    const username=result.recordset[0].UserName
                    console.log(username)
                    session.userid= result.recordset[0].UserName
                    console.log("the session name is: ",session.userid)
                    console.log(req.session)
                    return res.redirect('/')
                }
                else{
                    alert('password is wrong')
                }
            
            
           
          
        })}
        else{
          alert('email or password is wrong')
        //   return res.render('login')
        }
    })

    
}

const logout=(req,res)=>{
  req.session.destroy();
  res.redirect('/');
}

const page1= (req, res)=>{
  var session= req.session
  if(session.userid)
  {
    console.log(session.userid)
    res.render('page1',{username:" "})
  }
  else{
    res.send('error: need to register')
  }
  
}

module.exports={
    register_get,
    google_get,
    login_get,
    login_post,
    home_get,
    home_post,
    logout,
    home_page,
    page1
}