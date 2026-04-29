const express=require("express");
const cors=require("cors");
const employeeRoutes=require("./employeeRoutes")
const app=express();

app.use(cors());
app.use(express.json());
app.use("/api",employeeRoutes)

app.listen(5007,()=>{
    console.log("server is listening at 5007")
})