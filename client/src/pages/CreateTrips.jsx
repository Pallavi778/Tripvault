import './CreateTrips.css'
import { useState} from 'react'
import { useNavigate } from "react-router-dom";
function CreateTrip(){
const [title, setTitle] = useState("");
const [destination, setDestination] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [description, setDescription] = useState("");
const [rating, setRating] = useState(0);
const navigate = useNavigate();

async function handleSubmit(e) {
     e.preventDefault();
    const token = localStorage.getItem("token");
    if(!token){
    return;
    }
    const tripData = {
    title,
    destination,
    startDate,
    endDate,
    description,
    rating
};
const response = await fetch("http://localhost:5000/api/trips",{
    method: "POST" ,
    headers:{
       "Content-Type":"application/json",
       "Authorization":`Bearer ${token}`
    },
    body: JSON.stringify(tripData)
})
const data = await response.json();

if (response.ok) {
    console.log(data.message);
    navigate("/dashboard");
} else {
    console.log(data.message);
}
}
return(
    <div className='create-trip-page'>
     <h1>Create New Trip</h1>
    <p>Capture a new journey in your TripVault</p>
    <form onSubmit={handleSubmit}>
        <label>Trip Title</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>

        <label>Destination</label>
        <input id="destination" type="text" value={destination} onChange={(e) => setDestination(e.target.value)}/>

        <label>StartDate</label>
        <input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>

        <label>EndDate</label>
        <input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>

        <label>Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>

        <label>Rating</label>
        <div className="rating-stars">
           {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} onClick={() => setRating(star)}> {star <= rating ? "★" : "☆"} </span>
             ))}
                  </div>
                  <button type="submit">Create Trip</button>
    </form>
    </div>
)
}
export default CreateTrip;