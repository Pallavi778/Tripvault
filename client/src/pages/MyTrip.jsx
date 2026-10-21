import "./MyTrip.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function MyTrip(){
const navigate = useNavigate();
const [trips,setTrips] = useState([]);
useEffect(()=>{
async function getTrips(){
const token = localStorage.getItem("token");
const response = await fetch('http://localhost:5000/api/trips',{
  method:"GET",
  headers:{
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
  }
})
const tripdata = await response.json();
console.log("TRIP RESPONSE:", tripdata);
console.log("TRIPS:", tripdata.trips);
setTrips(tripdata.trips);
}
   getTrips()
   },[])
   function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
async function handleDelete(id){
const confirmDelete = window.confirm("Are you sure you want to delete this trip?");
if(!confirmDelete){
    return;
}
const token = localStorage.getItem("token");
const response = await fetch(`http://localhost:5000/api/trips/${id}`,
    {
        method:"DELETE",
        headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
    }
)
const data = await response.json();
if(response.ok){
setTrips(trips.filter((trip) => trip._id !== id));
// filter() is a JavaScript array method ,Go through every item and create a new array containing
//  only the items that satisfy a condition.
}
else{
      console.log(data.message);
}
}
function handleEdit(id){
    navigate(`/edit-trip/${id}`);
}
   return(
    <>
    <div className="mytrip-page">
      <div className="mytrip-header">
       
           <div className="mytrip-header1"><h1>My Trips</h1></div> 
            <p>Your journeys, your memories.</p>
             </div>
             <div className="trips">
            {trips.map((trip) => (
                <div className="trip-card" key={trip._id}>
                    <h2>{trip.title}</h2>
                    <p>{trip.destination}</p>
                    <p>📅 {formatDate(trip.startDate)}</p>
<p>📅 {formatDate(trip.endDate)}</p>
                   <p className="trip-rating">
    {"★".repeat(trip.rating)}
    {"☆".repeat(5 - trip.rating)}
</p>
<div>
<button onClick={() => handleDelete(trip._id)}>
Delete
</button>
<button onClick={() => handleEdit(trip._id)}>
 Edit 
</button>
</div>
                </div>
            ))}
            </div>
        </div>
    </>
)
}
export default MyTrip;