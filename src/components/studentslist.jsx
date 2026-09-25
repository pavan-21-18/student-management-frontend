function StudentList({students,editStudent,deleteStudent}){
    return(
        <>
          <h2>students</h2>
    {students.map((student)=>(
      <div key={student._id}>
        <h3>{student.name}</h3>
        <p>Email:{student.email}</p>
        <p>Age:{student.age}</p>
         <button onClick={()=>editStudent(student)}>edit</button>
        <button onClick={()=>deleteStudent(student.name)}>delete</button>
     
      </div>
    ))}
        </>
    )
}
export default StudentList;