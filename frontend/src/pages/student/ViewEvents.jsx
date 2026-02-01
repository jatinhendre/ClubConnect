import { useEffect, useState } from "react";
import api from "../../api/api";

function ViewEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  const registerEvent = async (id) => {
    await api.post("/registrations", { eventId: id });
    alert("Registered");
  };

  return (
    <div>
      <h3 className="mb-4">Upcoming Events</h3>

      <div className="grid-container">
        {events.map((event) => (
          <div
            key={event._id}
            className="card"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {event.poster && (
              <div className="poster-wrapper">
                <img
                  src={`http://localhost:5000/uploads/${event.poster}`}
                  alt={event.title}
                />
              </div>
            )}

            <h4 className="mb-2">{event.title}</h4>
            <p style={{ color: "#666", flex: 1, marginBottom: "16px" }}>
              {event.description}
            </p>

            <button
              className="btn btn-primary w-full"
              onClick={() => registerEvent(event._id)}
            >
              Register Now
            </button>
          </div>
        ))}
      </div>
      {events.length === 0 && (
        <p className="text-center">No upcoming events.</p>
      )}
    </div>
  );
}

export default ViewEvents;
