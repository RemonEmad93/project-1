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
        request.input('roleid2',sql.NVarChar,"2")
        request.input('roleid1',sql.NVarChar,"1")

        //get all rows with active=1
        request.query("select * from products where Active=1 ",(err,result)=>{      
            if(err)
            {   
                console.log(err)
            }else{
                var products
                products=result.recordset
                return res.render('displayUserProducts',{products:products, username:session.username ,signup:'', login:"",logout:"logout"})
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