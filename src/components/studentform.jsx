function StudentForm({
    name,
    email,
    age,
    setName,
    setEmail,
    setAge,
    editingStudent,
    setError,
    setEditingStudent,
    addStudent,
    updateStudent
}){
 return(
    <>
    <h2>{editingStudent?"edit student":"add student"}</h2>
     <input placeholder="Name"
    value={name}
    onChange={(e)=>{setName(e.target.value);
        setError("");
    }}
    />
     <input placeholder="Email"
    value={email}
    onChange={(e)=>{setEmail(e.target.value);
        setError("");
    }}
    />
    <input placeholder="Age"
    value={age}
    onChange={(e)=>{setAge(e.target.value);
        setError("");
    }}
    />
    
     {editingStudent?( <button onClick={updateStudent}>update student</button>
      ):(<button onClick={addStudent}>add student</button>)}
      {editingStudent&&(<button
        onClick={()=>{
            setEditingStudent(null);
            setName("");
            setEmail("");
            setAge("");
            setError("");
        }}>
            cancel
        </button>
      )}
    </>
)
}
export default StudentForm;