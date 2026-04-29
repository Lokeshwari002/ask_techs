const mysql=require("mysql2")

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kaviyazhini@09",
    database:"employee"
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