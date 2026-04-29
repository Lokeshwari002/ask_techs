const db=require("./dbConfig");



exports.departments=(req,res)=>{
   db.query("select * from departments",(err,result)=>{
    if(err){
  return res.status(500).json({error:err.message})
    }
    else{
        return res.json(result)
    }
   })

}


exports.designbyDepartments=(req,res)=>{
    const dept_id=req.params.id;
    db.query(" select * from designations where dept_id=?",[dept_id],(err,result)=>{
        if(err){
             return res.status(500).json({error:err.message})
        }
        else{
            return res.json(result)
        }
    })
}

exports.createEmployee=(req,res)=>{
      const{code,name,dept_id,designation_id,date_of_birth,date_of_joining,gender,salary}=req.body;

      db.query("select * from employees where code=?",[code],(err,result)=>{
        if(result.length>0){
          return res.json({message:"code already exists"})
        }
      })
db.query("insert into employees(code,name,dept_id,designation_id,date_of_birth,date_of_joining,gender,salary)values(?,?,?,?,?,?,?,?)",[code,name,dept_id,designation_id,date_of_birth,date_of_joining,gender,salary],(err,result)=>{
    if(err){
    return res.status(500).json({error:err.message})
}else{
        return res.json({message:"Employee Added"})
  }
})
}


exports.fetchEmployee=(req,res)=>{
    const sql=`select e.id,e.code,e.name,e.dept_id,e.designation_id,e.date_of_birth,e.date_of_joining,e.gender,e.salary,d.name as department,ds.name as designation
               from employees e
          join departments d ON e.dept_id = d.id
          join designations ds ON e.designation_id = ds.id`
      db.query(sql,(err,data)=>{
        if(err){
        return res.status(500).json({error:err.message})
        }
        else{
            return res.json(data)
        }
    })
    
}

exports.deleteEmployee=(req, res)=>{
  const id = req.params.id;
  db.query("delete from employees where id=?",[id],(err) => {
    if (err) {
        res.status(500).json(err);
    }
    res.json({message:"Deleted successfully"});
  });
};

exports.updateEmployee=(req, res)=>{
  const id=req.params.id;
  const{name,dept_id,designation_id,date_of_birth,date_of_joining,gender,salary}=req.body;
const sql =`update employees set name=?,dept_id=?,designation_id=?,date_of_birth=?,date_of_joining=?,gender=?,salary=? where id=?`
  db.query(sql, [name,dept_id,designation_id,date_of_birth,date_of_joining,gender,salary,id],(err)=>{
    if(err){
      return res.status(500).json(err);
    } 
    res.json({message:"Updated successfully"});
  });
};