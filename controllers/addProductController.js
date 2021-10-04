const sql = require("mssql/msnodesqlv8");
const sqlcon= require('../config/sqlConnection');


//render product input page
const inputs_get=(req,res)=>{
    var session= req.session

    const functionID=1

    if(session.userid)
    {
        request.input('username', sql.NVarChar, session.userid)
        request.input('functionID', sql.Int, functionID)

        request.query('select AccountID from Accounts where UserName=@username', (err, result)=>{
            if(err)
            {
              console.log(err)
            }else{
                console.log(result)
                const accountID=result.recordset[0].AccountID
                console.log(accountID)
                request.input('accountID', sql.Int, accountID)

                request.query('select * from permissions where AccountID=@accountID and FunctionID=@functionID', (err, result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(result.recordset[0]) 
                        if(result.recordset[0])
                        {
                            console.log("the id is:",result.recordset[0].AccountID)
                            res.render('addProduct',{message:'',username:session.userid ,signup:'', login:"",logout:"logout"})
                            

                        }else{
                            console.log("no id")
                            req.flash('message','need to register')
                            res.redirect('/')
                        }
                        
                    }
                })
            }
        })

        


        
    }
    else{
        req.flash('message','need to register')
        res.redirect('/')
    }


    
}
 
//post product data entered & save in DB
const inputs_post=(req, res)=>{
  var request= new sql.Request();
  var session= req.session

  const functionID=2

  if(session.userid)
    {
        request.input('username', sql.NVarChar, session.userid)
        request.input('functionID', sql.Int, functionID)

        request.query('select AccountID from Accounts where UserName=@username', (err, result)=>{
            if(err)
            {
              console.log(err)
            }else{
                console.log(result)
                const accountID=result.recordset[0].AccountID
                console.log(accountID)
                request.input('accountID', sql.Int, accountID)

                request.query('select * from permissions where AccountID=@accountID and FunctionID=@functionID', (err, result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(result.recordset[0]) 
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
    if(err){
      console.log('the error1')
      console.log(err)
    }
    else{
      //check active status then insert in DB
      if(req.body.active){
        request.query("insert into products(ProductName, ProductDescription, ProductPicture, CreateBy, UpdateBy) values(@productName, @productDescription , @pictureName, @createBy, @createBy )",(err)=>{
          if(err){
            console.log('the error2')
            console.log(err)
          }
          else{
            req.flash('message','add product successfully')
            res.render('addProduct',{message:req.flash("message"),username:session.userid ,signup:'', login:"",logout:"logout"})
            
          }
        })
      }
      else{
        request.query("insert into products(ProductName, ProductDescription, ProductPicture, Active, InActiveDate, CreateBy, UpdateBy) values(@productName, @productDescription , @pictureName, 0, getDate(), @createBy, @createBy )",(err)=>{
          if(err){
            console.log('the error3')
            console.log(err)
          }
          else{
            req.flash('message','add product successfully')
            res.render('addProduct',{message:req.flash("message"),username:session.userid ,signup:'', login:"",logout:"logout"})
            
          }
        })
      }
      
    }
  })
                        
                        
                    }
                })
            }
        })

        


        
    }
    else{
        req.flash('message','need to register')
        res.redirect('/')
    }

  

}

module.exports={
  inputs_get, 
  inputs_post
}