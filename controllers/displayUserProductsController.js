const sql = require("mssql/msnodesqlv8");
const sqlcon= require('../config/sqlConnection');


//get products from DB and render displayProducts page
const display_product=(req,res)=>{
    var request= new sql.Request();
    console.log('display products')
    var session= req.session

    const functionID=4

    if(session.userid)
    {
        request.input('username', sql.NVarChar, session.userid)
        request.input('functionID', sql.Int, functionID)

        request.query('select AccountID from Accounts where UserName=@username', (err, result)=>{
            if(err)
            {
                console.log(err)
            }else{
                const accountID=result.recordset[0].AccountID
                console.log(accountID)
                request.input('accountID', sql.Int, accountID)

                request.query('select AccountID from permissions where AccountID=@accountID and FunctionID=@functionID', (err)=>{
                    if(err){
                        console.log(err)
                    }else{
                        //get all rows with active=1
        request.query("select * from products where Active=1 ",(err,result)=>{
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