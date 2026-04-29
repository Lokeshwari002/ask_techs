const express=require("express");
const router=express.Router();
const{departments,deleteEmployee,updateEmployee,designbyDepartments,createEmployee,fetchEmployee}=require("./employeeController")


router.get("/fetchallDept",departments)
router.get("/fetchdesignByDepart/:id",designbyDepartments)
router.post("/newEmployee",createEmployee)
router.get("/fetchEmployee",fetchEmployee)
router.delete("/deleteEmployee/:id",deleteEmployee);
router.put("/updateEmployee/:id",updateEmployee)

module.exports=router

