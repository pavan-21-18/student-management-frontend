import { useState } from "react";
function Login({onLogin}){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleLogin=()=>{
        onLogin(email,password);
    }
    return(
        <>
        <h2>Login</h2>
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
        <button onClick={handleLogin}>
            Login
        </button>
        </>
    )
}
export default Login;