import { useState } from "react";
function Register({onRegister,showLogin}){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit=()=>{
        onRegister(name,email,password)
    };
    return(
        <>
        <h2>Register</h2>
        <input
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
         <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
         <input
         type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Register</button>
        <p>
            already have an account?
            <button onClick={showLogin}>Login</button>
        </p>
        </>
    )
}
export default Register;