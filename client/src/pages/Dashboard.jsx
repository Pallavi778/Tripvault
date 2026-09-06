import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard(){
  const navigate = useNavigate();
const [user , setUser] = useState("");
useEffect(()=>{
async function getUser(){
const token = localStorage.getItem("token");
const response  = await fetch("http://localhost:5000/api/auth/me",{
    method:"GET",
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
})
const data = await response.json();
setUser(data);
}
getUser();
},[]);
console.log(user);
function handleLogout(){
localStorage.removeItem("token");
navigate("/login");
}
return(
<div className="dashboard">
    <h1 className="dashboard-title">
        Welcome Back {user?.user?.name?.split(" ")[0]}
    </h1>
    <button className="logout-button" onClick = {handleLogout}>Logout</button>
</div>
)
}
export default Dashboard;