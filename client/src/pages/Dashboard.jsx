import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      setUser(data);
    }

    getUser();
  }, []);

  console.log(user);
  function handleCreateTrip() {
    navigate("/CreateTrip");
  }
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleTrips() {
    console.log("HANDLE TRIPS CALLED");
    navigate("/MyTrip");
  }

  return (
    <div className="dashboard">

      <nav className="dashboard-navbar">

        <div className="logo">
          ✈ TripVault
        </div>

        <div className="nav-links">
          <span>Your Journeys</span>
          <span>Your Stories</span>
          <span>Your Vault</span>
        </div>

        <div className="nav-actions">
          <button onClick={handleTrips}>
            My Trips
          </button>

          <button onClick={handleCreateTrip}>
            Create Trip
          </button>
           <button onClick={handleLogout}>
            Logout
          </button>
        </div>

      </nav>

      <section className="hero-section">

        <div className="hero-content">

          <h1>
            Welcome Back, {user?.user?.name?.split(" ")[0]} 👋
          </h1>

          <p className="hero-description">
            New places. Fresh stories. Same you — just happier.
          </p>

          <button
            className="hero-button"
            onClick={handleTrips}
          >
            Explore My Trips →
          </button>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;