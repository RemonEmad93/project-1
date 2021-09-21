var sql= require('mssql/msnodesqlv8');

var config={

    connectionString: 'Driver={SQL Server Native Client 10.0};Server={.};Database={GNP};Trusted_Connection={yes}',
    

};

var connection= sql.connect(config,(error)=>{
    if(!! error){
        console.log(error);
    }else{
        console.log("connected");
    }
});

module.exports=connection;