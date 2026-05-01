import React, {useEffect,useState} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const base_url = "https://ask-techs.onrender.com/api";

function Employeeform() {
  const[form,setForm]=useState({
    code:"",
    name:"",
    dept_id:"",
    designation_id:"",
    date_of_birth:"",
    date_of_joining:"",
    gender:"",
    salary:""
  });

  const[departments,setDepartments]=useState([]);
    const[designations,setDesignations]=useState([]);
    const[employees,setEmployees]=useState([]);
    const [errors, setErrors] = useState({});
    const[editId,setEditId]=useState(null);

  useEffect(()=>{
    axios.get(`${base_url}/fetchallDept`)
     .then(res=>setDepartments(res.data));
   fetchEmployees();
  },[]);

  const fetchEmployees=async()=>{
    const res=await axios.get(`${base_url}/fetchEmployee`);
    setEmployees(res.data||[]);
  };

  const handleDeptChange=async(e)=>{
    const deptId=e.target.value;

    setForm({...form,dept_id:deptId,designation_id:""});
    setErrors({...errors,dept_id:"" });

    if(deptId){
      const res=await axios.get(`${base_url}/fetchdesignByDepart/${deptId}`)
      setDesignations(res.data||[]);
    }else{
      setDesignations([]);
    }
  };

 
  const validate=()=>{
    let newErrors = {};
    if(!/^\d{1,6}$/.test(form.code)){
           newErrors.code="Code must be number(max 6 digits)";

    }
    if(!/^[A-Za-z ]{1,50}$/.test(form.name)){
            newErrors.name = "Name must contain only letters";

    }
    if(!form.dept_id){
      newErrors.dept_id = "Select department";
    } 
    if(!form.designation_id){
      newErrors.designation_id="Select designation"
    }

    if(!form.date_of_birth){
      newErrors.date_of_birth="Select DOB"
    }
    if(!form.date_of_joining){
      newErrors.date_of_joining="Select DOJ"
    }

  const dob=new Date(form.date_of_birth);
  const doj=new Date(form.date_of_joining);
   const today=new Date();

if(dob>today){
      newErrors.date_of_birth="DOB cannot be future"
    }
const age=today.getFullYear()-dob.getFullYear();
    if(age<18){
      newErrors.date_of_birth="Must be 18+"
    }

    if(doj>today){
      newErrors.date_of_joining="DOJ cannot be future"
    }

    if(!/^\d{1,7}(\.\d{1,2})?$/.test(form.salary)){
      newErrors.salary= "Salary invalid"
    }
   return newErrors;
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const validationErrors=validate();
    setErrors(validationErrors);

        if(Object.keys(validationErrors).length>0) return;

    const payload={...form,
      dept_id: Number(form.dept_id),
      designation_id: Number(form.designation_id),
      salary: Number(form.salary)
    };

    if(editId){
      await axios.put(`${base_url}/updateEmployee/${editId}`,payload);
      alert("Updated");
      setEditId(null);
    }else{
      await axios.post(`${base_url}/newEmployee`,payload);
      alert("Saved");
    }

    setForm({
      code:"",
      name:"",
      dept_id:"",
      designation_id:"",
      date_of_birth:"",
      date_of_joining:"",
      gender:"",
      salary:""
    });
    setErrors({})
  fetchEmployees();
  };

  const handleEdit=async(emp)=>{
    setForm({
      code:emp.code||"",
      name:emp.name||"",
      dept_id:emp.dept_id||"",
      designation_id:emp.designation_id||"",
      date_of_birth:emp.date_of_birth?.slice(0,10)||"",
      date_of_joining:emp.date_of_joining?.slice(0,10)||"",
      gender:emp.gender||"",
      salary:emp.salary||""
    });
  setEditId(emp.id);

  const res=await axios.get(`${base_url}/fetchdesignByDepart/${emp.dept_id}`)
    setDesignations(res.data||[])
  }


  const handleDelete=async(id)=>{
    await axios.delete(`${base_url}/deleteEmployee/${id}`);
    alert("Deleted");
    fetchEmployees();
  };

  const handleCancel=()=>{
    setForm({
      code:"",
      name:"",
      dept_id:"",
      designation_id:"",
      date_of_birth:"",
      date_of_joining:"",
      gender:"",
      salary:""
    });
    setErrors({})
  setEditId(null);
  setDesignations([]);
  };

  return (
    <div className="container mt-4">
  <h3 className="text-center mb-4 fw-bold">Employee Form</h3>
   <form onSubmit={handleSubmit} className="card p-3 p-md-4 shadow-sm">

  <div className="row g-2 mb-3">
    <div className="col-12 col-md-6">
  <input className="form-control mt-2 mb-1" placeholder="Code" value={form.code} onChange={e =>{setForm({...form,code:e.target.value})
              setErrors({...errors,code:"" })
              }}/>
  {errors.code && <small className="text-danger">{errors.code}</small>}

          </div>

  <div className="col-12 col-md-6">
    <input className="form-control mt-2 mb-1" placeholder="Name" value={form.name} onChange={e => {setForm({ ...form,name:e.target.value})
              setErrors({ ...errors, name: "" })
  }}/>
    {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>
        </div>


<div className="row g-2 mb-3">
    <div className="col-12 col-md-6">
            <select className="form-select mt-2" value={form.dept_id} onChange={handleDeptChange}>
              <option value="">Select Department</option>
              {departments.map(d=>(
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            {errors.dept_id && <small className="text-danger">{errors.dept_id}</small>}


          </div>

  <div className="col-12 col-md-6">
    <select className="form-select mt-2" value={form.designation_id} onChange={e=>{setForm({...form,designation_id:e.target.value})
          setErrors({ ...errors, designation_id: "" });
          }}>
  <option value="">Select Designation</option>
        {designations.map(d=>(
          <option key={d.id} value={d.id}>{d.name}</option>
    ))}
            </select>
{errors.designation_id && <small className="text-danger">{errors.designation_id}</small>}
</div>
        </div>

  <div className="row g-2 mb-3">
          <div className="col-12 col-md-6">
            <label className="form-label mt-2">Date of Birth</label>
           <input type="date" className="form-control mt-2" placeholder="Date Of Birth" value={form.date_of_birth} onChange={e=>{setForm({...form,date_of_birth:e.target.value})
                     setErrors({ ...errors, date_of_birth: "" });
          }}/>
{errors.date_of_birth && <small className="text-danger">{errors.date_of_birth}</small>}

          </div>

          <div className="col-12 col-md-6">
            <label className="form-label mt-2">Date of Joining</label>
       <input type="date" className="form-control mt-2" placeholder="Date of joining" value={form.date_of_joining} onChange={e=>{setForm({...form, date_of_joining:e.target.value })
          setErrors({ ...errors, date_of_joining: "" });
          
          }}/>
{errors.date_of_joining && <small className="text-danger">{errors.date_of_joining}</small>}

          </div>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-12 col-md-6">
        <select className="form-select mt-2" value={form.gender} onChange={e=>{setForm({...form,gender:e.target.value})
  }}>
            <option value="">Gender</option>
            <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="col-12 col-md-6">
            <input className="form-control mt-2" placeholder="Salary" value={form.salary} onChange={e =>{setForm({...form,salary:e.target.value})
          setErrors({ ...errors, salary: "" });
          }}/>
{errors.salary && <small className="text-danger">{errors.salary}</small>}

          </div>
        </div>

        
<div className="d-flex gap-2 flex-wrap justify-content-center mt-3">
  <button className="btn btn-primary btn-sm px-4">{editId?"Update":"Add"}</button>
   <button type="button" className="btn btn-secondary btn-sm px-4" onClick={handleCancel}>Cancel</button>
        </div>
</form>

      
<div className="table-responsive mt-3">
  <table className="table table-bordered table-striped text-center" style={{ minWidth: "900px" }}>
    <thead className="table-dark">
             <tr>
              <th>S.No</th>
              <th>Code</th>
             <th>Name</th>
              <th>Dept</th>
              <th>Designation</th>
              <th className="d-none d-md-table-cell">DOB</th>
              <th className="d-none d-md-table-cell">DOJ</th>
              <th>Gender</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
</thead>

  <tbody>
{employees.map(emp => (
  <tr key={emp.id}>
    <td>{emp.id}</td>
  <td>{emp.code}</td>
  <td>{emp.name}</td>
  <td>{emp.department}</td>
  <td>{emp.designation}</td>
  <td className="d-none d-md-table-cell">{emp.date_of_birth?.slice(0, 10)}</td>
  <td className="d-none d-md-table-cell">{emp.date_of_joining?.slice(0, 10)}</td>
  <td>{emp.gender}</td>
  <td>{emp.salary}</td>
  <td><div className="d-flex gap-2">
<button className="btn btn-warning btn-sm" onClick={() => handleEdit(emp)}>Edit</button>
<button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp.id)}>Delete</button>
  </div>
</td>
</tr>
))}
    </tbody>

</table>
 </div>
</div>
  );
}

export default Employeeform;