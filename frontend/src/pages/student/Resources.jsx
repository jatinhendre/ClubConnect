import { useEffect, useState } from "react";
import api from "../../api/api";

function Resources() {

  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [resources, setResources] = useState([]);

  useEffect(() => {
    api.get("/events").then((res)=>{
      setEvents(res.data);
    });
  }, []);

  const loadResources = async (id) => {
    const res = await api.get(`/resources/${id}`);
    setResources(res.data);
  };

  return (
    <div>
      <h3>Resources</h3>

      <select onChange={(e)=>{
        setEventId(e.target.value);
        loadResources(e.target.value);
      }}>
        <option>Select Event</option>
        {events.map(ev=>(
          <option key={ev._id} value={ev._id}>{ev.title}</option>
        ))}
      </select>

      {resources.map(r=>(
        <div key={r._id}>
          <a
            href={`http://localhost:5000/uploads/${r.file}`}
            target="_blank"
          >
            {r.title}
          </a>
        </div>
      ))}
    </div>
  );
}

export default Resources;
