import "./EditForm.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditForm() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);
    // Get existing trip
    useEffect(() => {
        async function getTrip() {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `http://localhost:5000/api/trips/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            const data = await response.json();
            if (response.ok) {
                const trip = data.trip;
                setTitle(trip.title);
                setDestination(trip.destination);
                setStartDate(trip.startDate?.split("T")[0]);
                // MongoDB date → remove time → put date into input , 2026-10-10T00:00:00.000Z
                setEndDate(trip.endDate?.split("T")[0]);
                setDescription(trip.description || "");
                setRating(trip.rating || 0);
            } else {
                console.log(data.message);
            }
        }
        getTrip();
    }, [id]);
    // Update trip
    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const tripData = {
            title,
            destination,
            startDate,
            endDate,
            description,
            rating
        };
        const response = await fetch(
            `http://localhost:5000/api/trips/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(tripData)
            }
        );
        const data = await response.json();
        if (response.ok) {
            console.log(data.message);
            navigate("/MyTrip");
        } else {
            console.log(data.message);
        }
    }
    return (
        <div className="edit-trip-page">

            <h1>Edit Trip</h1>
            <p>Update your journey details</p>

            <form onSubmit={handleSubmit}>
                <label>Trip Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Destination</label>
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />

                <label>Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <label>End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Rating</label>

                <div className="rating-stars">

                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setRating(star)}
                        >
                            {star <= rating ? "★" : "☆"}
                        </span>
                    ))}
                </div>
                <button type="submit">
                    Update Trip
                </button>

            </form>

        </div>
    );
}
export default EditForm;
