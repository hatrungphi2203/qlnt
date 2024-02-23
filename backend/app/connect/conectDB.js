var mysql=require('mysql');
require('dotenv').config();
var connection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASS,
    database:process.env.DATABASE,
    timezone:'Asia/Ho_Chi_Minh',
});

connection.connect(function(err){
    if(err)
    {console.log("KHÔNG THÀNH CÔNG");
    console.log(err);
    console.log({host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASS,
        database:process.env.DATABASE})
}
});
module.exports=connection;