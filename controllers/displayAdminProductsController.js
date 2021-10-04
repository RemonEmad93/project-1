const sql = require("mssql/msnodesqlv8");
const sqlcon= require('../config/sqlConnection');


//get products from DB and render displayProducts page
const display_product=(req,res)=>{
    var request= new sql.Request();
    console.log('display products')
    var session= req.session
    
    const functionID=3

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
                            //get all rows from DB
                        request.query("select * from products  ",(err,result)=>{
                            if(err)
                            {
                                console.log(err)
                            }
                            else{
                               
                                
                                var products
                                products=result.recordset
                                return res.render('displayAdminProducts',{products:products, username:session.userid ,signup:'', login:"",logout:"logout"})
                            }
                        })

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



module.exports={
    display_product
}