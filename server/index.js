const express=require("express");
const cors=require("cors");
const employeeRoutes=require("./employeeRoutes")
const app=express();
require("dotenv").config()
const PORT=process.env.DB_PORT;

app.use(cors());
app.use(express.json());
app.use("/api",employeeRoutes)

app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
})