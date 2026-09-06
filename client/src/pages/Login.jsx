import "./Login.css"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link , useNavigate} from "react-router-dom";
function Login(){
    const navigate = useNavigate();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error, setError] = useState("");
    async function handleSubmit(e){
    e.preventDefault();
     const response = await fetch('http://localhost:5000/api/auth/login',{
            method: "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
            email,
            password
            })
        })
        const data = await response.json();
        console.log(data);
        if(response.ok){
            localStorage.setItem("token",data.token);
            navigate("/dashboard");
        }
        else{
            setError(data.message);
        }
    }
    const [showPassword , setShowPassword] = useState(false);
    return(
        <div className="login-page">
        <form className = "login-form" onSubmit={handleSubmit} autoComplete="off">
            <h1>TripVault</h1>
            <h2>Welcome Back!</h2>
            <div>
                <input type="email" autoComplete="email" value={email} placeholder="Enter Email" onChange ={(e)=>setEmail(e.target.value)} />
                </div>
            <div className="password-field">
                <input type= {showPassword?"text":"password"} autoComplete="new-password" value={password} placeholder="Enter Password" onChange ={(e)=>setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</button>
                </div>
                {error && <p className="error-message">{error}</p>}
            <button className = "login-button" type="submit">Login</button>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </form>
        </div>
    )
}
export default Login;