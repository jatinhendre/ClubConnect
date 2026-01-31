import { useEffect, useState } from "react";
import api from "../../api/api";

function ViewEvents() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then((res)=>{
      setEvents(res.data);
    });
  }, []);

  const registerEvent = async (id) => {
    await api.post("/registrations", { eventId: id });
    alert("Registered");
  };

  return (
    <div>
      <h3>Events</h3>

      {events.map((event)=>(
        <div key={event._id}>
          <h4>{event.title}</h4>
          <p>{event.description}</p>

          {event.poster && (
            <img
              src={`http://localhost:5000/uploads/${event.poster}`}
              width="200"
            />
          )}

          <button onClick={()=>registerEvent(event._id)}>
            Register
          </button>
        </div>
      ))}
    </div>
  );
}

export default ViewEvents;
