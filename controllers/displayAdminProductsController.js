const sql = require("mssql/msnodesqlv8");
const sqlcon= require('../config/sqlConnection');


//get products from DB and render displayProducts page
const display_product=(req,res)=>{
    var request= new sql.Request();
    console.log('display products')
    var session= req.session
    

    if(session.userid)
    {
        request.input('accountid', sql.NVarChar, session.userid)
        request.input('roleid',sql.NVarChar,"1")

        //check if user is admin
        request.query('select UserRoleID from UserRoles where AccountID=@accountid and RoleID=@roleid', (err, result)=>{
            if(err)
            {
                console.log('get admin display products err 1')
                console.log(err)
            }else{
                if(result.recordset.length>0)
                {
                    //get all rows from DB
                    request.query("select * from products  ",(err,result)=>{
                        if(err)
                        {
                            console.log(err)
                        }else{
                            var products
                            products=result.recordset
                            return res.render('displayAdminProducts',{products:products, username:session.username ,signup:'', login:"",logout:"logout"})
                        }
                    })  
                }else{
                    req.flash('message','need to register as admin')
                    res.redirect('/')
                }
            } 
        })    
    }else{
        req.flash('message','need to register')
        res.redirect('/')
    }
}



module.exports={
    display_product
}