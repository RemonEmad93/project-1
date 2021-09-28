const sql = require("mssql/msnodesqlv8");
const sqlcon= require('../config/sqlConnection');
const alert = require('alert'); //pop message
const bcrypt = require('bcrypt'); // used for encryption of passwords

const saltRounds = 10;  //used in encryption of passwords

//render login page
const login_get=(req, res)=>{
    res.render('login' ,{username:" ",signup:'sign up', login:"",logout:""})
}

//post the data entered by the user
const login_post=(req, res)=>{
    var session= req.session
    var request= new sql.Request();

    request.input("email",sql.NVarChar,req.body.email)
    request.input("password",sql.NVarChar,req.body.password)
    
    request.query('select Email, Password, UserName from accounts where Email=@email ',(err,result)=>{
        //check email
        if(result.recordset.length!=0){
            //check password when email found
            bcrypt.compare(req.body.password, result.recordset[0].Password, function (err, isValid) {
                if(isValid){
                    session.userid= result.recordset[0].UserName
                    return res.redirect('/')
                }
                else{
                    alert('password is wrong')
                }
            }
        )}
        else{
          alert('email or password is wrong')
        }
    })
}

module.exports={
    login_get, 
    login_post
}