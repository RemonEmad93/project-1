var sql= require('mssql/msnodesqlv8');

var config={
    /* server: process.env.SERVER,
    port: process.env.SQLPort,
    database: process.env.DATABASE, 
    driver:"msnodesqlv8", */
    
    connectionString: 'Driver={SQL Server Native Client 11.0};Server={.};Database={GNP};Trusted_Connection={yes}',
};

var connection= sql.connect(config,(error)=>{
    if(!! error){
        console.log(error);
    }else{
        console.log("connected");
    }
});

module.exports=connection;