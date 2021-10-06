const sql = require("mssql/msnodesqlv8");
const sqlcon= require('../config/sqlConnection');


//render product input page
const inputs_get=(req,res)=>{
  var request= new sql.Request();
  var session= req.session

  //check if user login 
  if(session.userid)
  {
    request.input('accountid', sql.NVarChar, session.userid)
    request.input('roleid',sql.NVarChar,"1")
    
    //check if user is admin
    request.query('select UserRoleID from UserRoles where AccountID=@accountid and RoleID=@roleid', (err, result)=>{
      if(err)
      {
        console.log('get add product err 1')
        console.log(err)
      }else{
        //if admin
        if(result.recordset.length>0)
        {
          return res.render('addProduct',{message:'',username:session.username ,signup:'', login:"",logout:"logout"})
        //if not admin  
        }else{
          req.flash('message','need to register as admin')
          return res.redirect('/')
        }
      }
    })    
  }else{
    req.flash('message','need to register')
    res.redirect('/')
  } 
}
 
//post product data entered & save in DB
const inputs_post=(req, res)=>{
  var request= new sql.Request();
  var session= req.session

  //check if user login 
  if(session.userid)
  {
    request.input('accountid', sql.NVarChar, session.userid)
    request.input('roleid',sql.NVarChar,"1")

    //check if user is admin
    request.query('select UserRoleID from UserRoles where AccountID=@accountid and RoleID=@roleid', (err, result)=>{
      if(err)
      {
        console.log('post add product err1')
        console.log(err)
      }else{
        if(result.recordset.length>0)
        {
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); //get current date
          var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds(); // get current time
          var dateTime = time+' '+date; //current time& date
          var pictureNameWithTime=dateTime+" "+ req.files.productPicture.name // add current time and date to uploaded file name

          request.input("productName",sql.NVarChar,req.body.productName)
          request.input("productDescription",sql.NVarChar,req.body.productDescription)
          request.input('pictureName',sql.NVarChar,pictureNameWithTime)
          request.input('inActiveDate',sql.NVarChar,dateTime)
          request.input('createBy', sql.NVarChar, session.userid)

          var picturedata=req.files.productPicture //variable for picture details

          //save picture in folder productsImages & DB then render addProduct page again
          picturedata.mv('../project 1/public/productsImages/'+pictureNameWithTime,function(err){
            if(err)
            {
              console.log('the error1')
              console.log(err)
            }else{
              //check active state then insert in DB
              if(req.body.active)
              {
                request.query("insert into products(ProductName, ProductDescription, ProductPicture, CreateBy, UpdateBy) values(@productName, @productDescription , @pictureName, @createBy, @createBy )",(err)=>{
                  if(err)
                  {
                    console.log('the error2')
                    console.log(err)
                  }else{
                    req.flash('message','add product successfully')
                    res.render('addProduct',{message:req.flash("message"),username:session.username ,signup:'', login:"",logout:"logout"})
                  }
                })
              //if active state not selected 
              }else{
                request.query("insert into products(ProductName, ProductDescription, ProductPicture, Active, InActiveDate, CreateBy, UpdateBy) values(@productName, @productDescription , @pictureName, 0, getDate(), @createBy, @createBy )",(err)=>{
                  if(err)
                  {
                    console.log('the error3')
                    console.log(err)
                  }else{
                    req.flash('message','add product successfully')
                    res.render('addProduct',{message:req.flash("message"),username:session.username ,signup:'', login:"",logout:"logout"})  
                  }
                })
              }  
            }
          })
        }else{
          req.flash('message','need to register as admin')
          return res.redirect('/')
        }
      }
    })       
  }else{
    req.flash('message','need to register')
    res.redirect('/')
  }
}

module.exports={
  inputs_get, 
  inputs_post
}