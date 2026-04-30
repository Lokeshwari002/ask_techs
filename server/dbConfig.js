const mysql=require("mysql2")
require("dotenv").config()

const db=mysql.createConnection({
   host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:"railway",
    port:process.env.DB_PORT
})



db.connect((err)=>{
    if(err){
        console.log("error in connection")
    }
    else{
        console.log("successfully connected to db")
    }
})

module.exports=db;