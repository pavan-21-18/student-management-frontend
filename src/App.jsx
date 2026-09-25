// import { useState } from "react";
// function app(){
//    const [count,setcount]=useState(0);
//   return(
//     <>
//     <h1>Counter App</h1>
//     <h2>{count}</h2>
//     <button onClick={()=>setcount(count+1)}>
//       increment
//     </button>
//      <button onClick={()=>setcount(count-1)}>
//       decrement
//     </button>
//      <button onClick={()=>setcount(0)}>
//     reset
//     </button>
//     </>
//   );
// }
// export default app;
// function Student(props){
//   return (<><h1>name:{props.name}</h1>
//             <p>age:{props.age}</p>
//             <p>city:{props.city}</p>
//             </>
//   )
// }
// function App(){
//  return(
//   <>
//   <Student name="pavan" age={20} city="hyd"/>
//   <Student name="arjun" age={20} city="pun"/>
//   <Student name="ganesh" age={20} city="rcb"/>
//   </>
//  );
// }
// import { useState } from "react";
// function App(){
//   const[name,setName]=useState("");
//   return(
//     <>
//     <input onChange={(e)=>setName(e.target.value)}
//     />
//     <h2>{name}</h2>
//     </>
//   );
// }
// import { useState } from "react";
// function App(){
//   const[isLoggedIn,setLoggedIn]=useState(false);
// // function handlesubmit(e){
// //   e.preventDefault(),alert(name)
// // }
// return (
//   <>
//   <h1>
//     {isLoggedIn? "welcome!":"please login"}
//   </h1>
//   <button onClick={()=>setLoggedIn(!isLoggedIn)}>
//     {isLoggedIn? "logout":"login"}
//   </button>
//   </>
// )
// }
// export default App;
// const students=[
//   {name:"pavan",age:19},
//   {name:"arjun",age:19},
//   {name:"ganesh",age:20}
// ];
// function app(){
//   return(
//     <>
//     <h1>students</h1>
//     {students.map((student)=>(
//       <div>
//         <h2>{student.name}</h2>
//         <p>Age:{student.age}</p>
//       </div>
//     ))}
//     </>
//   )
// }
// export default app;
// import { useState, useEffect } from "react";

// function App() {

//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log("Count changed:", count);
//   }, [count]);

//   return (
//     <>
//       <h1>{count}</h1>

//       <button onClick={() => setCount(count + 1)}>
//         Increment
//       </button>
//     </>
//   );
// }

// export default App;
import { useEffect,useState } from "react";
import StudentList from "./components/studentslist";
import StudentForm from "./components/studentform";
import Login from "./components/login";
import Register from "./components/register";
const API_URL=import.meta.env.VITE_API_URL;
function App(){
  const [students,setStudents]=useState([])
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const[age,setAge]=useState("");
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [isLoggedIn,setIsLoggedIn]=useState(!!localStorage.getItem("token"))
  const [editingStudent, setEditingStudent] = useState(null);
  const [showRegister,setShowRegister]=useState(false)
  const getStudents=()=>{
    setLoading(true);
    setError("");
    const token=localStorage.getItem("token");
     fetch(`${API_URL}/student`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
     })
     .then((response)=>{
      if(response.status===401){
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        throw new Error("session expired please login again");
      }
      if(!response.ok){
        throw new Error("failed to fetch students");
      }
      return response.json();
     })
     .then((data)=>{setStudents(data)})
     .catch((error)=>{
      setError(error.message);
     })
    .finally(()=>{
      setLoading(false);
    });
    
  }
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token){
   getStudents();
    }
    },[]);
    const addStudent=()=>{
      if(!name||!email||!age){
        setError("please fill in all fields");
        return;
      }
      if(!email.includes("@")){
        setError("please enter valid email");
        return;
      }
      if(Number(age)<=0){
        setError("age must be greater than zero");
        return;
      }
      const token=localStorage.getItem("token");
      fetch(`${API_URL}/student`,{
        method:"POST",
        headers:{
        "content-type":"application/json",
         Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({name:name,
  email:email,
  age:Number(age)})
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error("failed to add the student");
      }
      return response.json();
    })
    .then(()=>{
      getStudents();
      setName("");
      setEmail("");
      setAge("");
      setError("");
    })
    .catch((error)=>{
      setError(error.message);
    })
  };
    const deleteStudent=(name)=>{
      const token=localStorage.getItem("token");
      fetch(`${API_URL}/student/${name}`,{
        method:"DELETE",
        headers:{
        Authorization:`Bearer ${token}`
        }
      })
      .then((response)=>{
        if(!response.ok){
          throw new Error("failed to delete student")
        }
        return response.json()})
      .then((data)=>{
        console.log(data);
        getStudents();
      })
      .catch((error)=>{
        setError(error.message);
      })

  };
  const updateStudent=()=>{
    if(!name||!email||!age){
        setError("please fill in all fields");
        return;
      }
      if(!email.includes("@")){
        setError("please enter valid email");
        return;
      }
      if(Number(age)<=0){
        setError("age must be greater than zero");
        return;
      }
      const token=localStorage.getItem("token");
    fetch(`${API_URL}/student/${editingStudent.name}`,{
        method:"PUT",
        headers:{
        "content-type":"application/json",
        Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
          name:name,
          email:email,
          age:Number(age)
        })
      })
      .then((response)=>{
        if(!response.ok){
          throw new Error("failed to update the student");
        }
      return response.json()
  })
      .then((data)=>{
        console.log(data);
        getStudents();
        setName("");
        setEmail("");
        setAge("");
        setError("");
        setEditingStudent(null);
      })
      .catch((error)=>{
        setError(error.message);
      })
   }
   const editStudent=(student)=>{
    setEditingStudent(student);
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
   }
   const handleLogin=(email,password)=>{
    fetch(`${API_URL}/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
    body: JSON.stringify({
      email:email,
      password: password
    })
   })
   .then(async(response)=>{
    const data=await response.json();
    if(!response.ok){
      throw new Error(data.message||"login failed");
    }
    return data;
   })
   .then((data)=>{
    console.log(data);
    localStorage.setItem("token",data.token);
    setIsLoggedIn(true);
    getStudents();
   })
   .catch((error)=>{
    console.log("login error:",error.message);
   })
  }
  const handleRegister=(name,email,password)=>{
     fetch(`${API_URL}/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
    body: JSON.stringify({
      name,
      email,
      password
    })
   })
   .then((response)=>{
    if(!response.ok){
      throw new Error("registration failed");
    }
    return response.json();
   })
    .then((data)=>{
    console.log(data);
    alert("registration successfull please login");
    setShowRegister(false)
   })
   .catch((error)=>{
    alert(error.message);
   })
  }
  const logout=()=>{
    localStorage.removeItem("token");
    setStudents([]);
    setIsLoggedIn(false);
  }
  return(
    <>
    <h1>student management</h1>
    {!isLoggedIn?(
      !showRegister?(
        <Register
        onRegister={handleRegister}
        showLogin={()=>setShowRegister(true)}
        />
      ):(
        <>
    <Login onLogin={handleLogin}/>
    <p>
      dont have an account?
      <button onClick={()=>setShowRegister(true)}>Register</button>
    </p>
    </>
      )
    ):(
      <>
      <button onClick={logout}>Logout</button>
    <StudentForm
    name={name}
    email={email}
    age={age}
    setName={setName}
    setEmail={setEmail}
    setAge={setAge}
    editingStudent={editingStudent}
    addStudent={addStudent}
    updateStudent={updateStudent}
    setEditingStudent={setEditingStudent}
    setError={setError}
    />
    {loading&&<p>loading students...</p>}
    {error&&<p>{error}</p>}
    <StudentList
        students={students}
        editStudent={editStudent}
        deleteStudent={deleteStudent}
      />
    </>
  )};
  </>
  );
}
export default App;