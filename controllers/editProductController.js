const flash = require("express-flash");
const sql = require("mssql/msnodesqlv8");
const sqlcon= require('../config/sqlConnection');

var ProductIndex;

//get data from DB and render the edit page
const edit_product_get=(req, res)=>{
  var request= new sql.Request();
  var session= req.session
  
  if(session.userid)
  {
    request.input('accountid', sql.NVarChar, session.userid)
    request.input('roleid',sql.NVarChar,"1")

    request.query('select UserRoleID from UserRoles where AccountID=@accountid and RoleID=@roleid', (err, result)=>{
      if(err)
      {
        console.log(err)
      }else{
        if(result.recordset.length>0)
        {
          ProductIndex= req.params.productid;
          request.input('productIndex', sql.Int, ProductIndex)
          request.query("select ProductName, ProductDescription, ProductPicture from Products where ProductID=@productIndex",(err, result)=>{
            if(err)
            {
              console.log(err)
            }else{
              var products=null
              products=result.recordset
              res.render('editProduct',{ products:products, username:session.username ,signup:'', login:"",logout:"logout"})
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

const edit_product_post=(req, res)=>{
  var request= new sql.Request();
  var session= req.session

  if(session.userid)
  {
    request.input('accountid', sql.Int, session.userid)
    request.input('roleid',sql.NVarChar,"1")

    request.query('select UserRoleID from UserRoles where AccountID=@accountid and RoleID=@roleid', (err, result)=>{
      if(err)
      {
        console.log(err)
      }else{
        if(result.recordset.length>0)
        {
          console.log("the id is:",result.recordset[0].AccountID)
          request.input('productIndex', sql.Int, ProductIndex)
          request.input('productname', sql.NVarChar, req.body.productName)
          request.input('productdescription',sql.NVarChar,req.body.productDescription)
          request.input('updatedby',sql.NVarChar,session.userid)
          request.input('active',sql.Bit,0)

          //when user change the picture and the active state
          if(req.files.productPicture!=0 && !req.body.active)
          {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); //get current date
            var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds(); // get current time
            var dateTime = time+' '+date; //current time& date
            var pictureNameWithTime=dateTime+" "+ req.files.productPicture.name // add current time and date to uploaded file name

            request.input('productpicture',sql.NVarChar,pictureNameWithTime)

            var picturedata=req.files.productPicture //variable for picture details

            //save picture in folder productsImages & DB then render addProduct page again
            picturedata.mv('../project 1/public/productsImages/'+pictureNameWithTime,function(err){
              if(err)
              {
                console.log('the error1')
                console.log(err)
              }else{
                //update values of the selected product in the DB
                request.query('update Products set ProductName=@productname, ProductDescription=@productdescription, ProductPicture=@productpicture, UpdateBy=@updatedby, UpdateDate=getDate(), InActiveDate=getDate(), Active=0 where ProductID= @productIndex',(err)=>{
                  if(err)
                  {
                    console.log(err)
                  }else{
                    req.flash("message","product edited successfully")
                    res.redirect('/')
                  }
                })
              }
            })      
          }
          //when user change active state
          else if(!req.body.active){
            request.query('update Products set ProductName=@productname, ProductDescription=@productdescription, UpdateBy=@updatedby, UpdateDate=getDate(), InActiveDate=getDate(), Active=0 where ProductID= @productIndex',(err)=>{
              if(err)
              {
                console.log(err)
              }else{
                req.flash("message","product edited successfully")
                res.redirect('/')
              }
            })
          } 
          //when user change the picture
          else if(req.files.productPicture!=0 ){
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); //get current date
            var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds(); // get current time
            var dateTime = time+' '+date; //current time& date
            var pictureNameWithTime=dateTime+" "+ req.files.productPicture.name // add current time and date to uploaded file name

            request.input('productpicture',sql.NVarChar,pictureNameWithTime)
          
            var picturedata=req.files.productPicture //variable for picture details

            //save picture in folder productsImages & DB then render addProduct page again
            picturedata.mv('../project 1/public/productsImages/'+pictureNameWithTime,function(err){
              if(err){
                console.log('the error1')
                console.log(err)
              }else{
                //update values of the selected product in the DB
                request.query('update Products set ProductName=@productname, ProductDescription=@productdescription, ProductPicture=@productpicture, UpdateBy=@updatedby, UpdateDate=getDate() where ProductID= @productIndex',(err)=>{
                  if(err){
                    console.log(err)
                  }else{
                    req.flash("message","product edited successfully")
                    res.redirect('/')
                  }
                })      
              }
            }) 
          }         
        }else{
          req.flash('message','need to register as admin')
          return res.redirect('/')
        }
      }
    })     
  }else{
    console.log("no id")
    req.flash('message','need to register')
    res.redirect('/')
  }                    
}
      
module.exports={
    edit_product_get, 
    edit_product_post
}