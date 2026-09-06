import "./Register.css";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link , useNavigate} from "react-router-dom";
function Register(){
    const navigate = useNavigate();
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword , setShowPassword] = useState(false);
   async function handleSubmit(e){
        e.preventDefault();
      const response = await fetch('http://localhost:5000/api/auth/register',{
            method: "POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
            name,
            email,
            password
            })
        })
        const data = await response.json();
        console.log(data);
        if(response.ok){
            navigate("/login");
        }
        else{
           setError(data.message);
        }   
    }
    return(
        <div className="register-page">
        <form className = "register-form" onSubmit={handleSubmit}>
            <h2>Create Your Account</h2>
            <div>
                <input type="text" placeholder="Enter Name" onChange ={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <input type="email"  autoComplete="email" value={email} placeholder="Enter Email" onChange ={(e)=>setEmail(e.target.value)}/>
                </div>
            <div className="password-field">
                <input type= {showPassword?"text":"password"} autoComplete="new-password"  value={password} placeholder="Enter Password" onChange ={(e)=>setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}> {showPassword ? <EyeOff /> : <Eye />}</button>
                </div>
                {error && <p className="error-message">{error}</p>}
            <button className = "register-button" type="submit">Register</button>
             <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
        </div>
    )
}
export default Register;