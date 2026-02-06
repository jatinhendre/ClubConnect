import { useEffect, useState } from "react";
import api from "../../api/api";

function ViewEvents() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div>
      <h3 className="mb-4">All Events</h3>

      <div className="card table-container">
        <table className="table-styled">
          <thead>
            <tr>
              <th>Title</th>
              <th>Club</th>
              <th>Event Date</th>
              <th>Description</th>
              <th>Poster</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id}>
                <td style={{color:"black"}}>{event.title}</td>
                <td style={{color:"black"}}>
                  {event.clubId?.clubName || "N/A"}
                </td>
                <td style={{color:"black"}}>
                  {formatDate(event.eventDate)}
                </td>
                <td style={{color:"black", maxWidth: "300px"}}>
                  {event.description}
                </td>
                <td>
                  {event.poster ? (
                    <img 
                      src={`http://localhost:5000/uploads/${event.poster}`}
                      alt={event.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px"
                      }}
                    />
                  ) : (
                    <span style={{ color: "#888" }}>No poster</span>
                  )}
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewEvents;
