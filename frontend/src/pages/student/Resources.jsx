import { useEffect, useState } from "react";
import api from "../../api/api";

function Resources() {

  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [resources, setResources] = useState([]);

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  const loadResources = async (id) => {
    const res = await api.get(`/resources/${id}`);
    setResources(res.data);
  };

  return (
    <div className="card">
      <h3 className="mb-4">Resources</h3>

      <div className="form-group">
        <label>Select Event</label>
        <select className="form-select" onChange={(e) => {
          setEventId(e.target.value);
          loadResources(e.target.value);
        }}>
          <option>Select Event to View Resources</option>
          {events.map(ev => (
            <option key={ev._id} value={ev._id}>{ev.title}</option>
          ))}
        </select>
      </div>

      {resources.length > 0 ? (
        <div className="table-container mt-3">
          <table className="table-styled">
            <thead>
              <tr>
                <th>Resource Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resources.map(r => (
                <tr key={r._id}>
                  <td>{r.title}</td>
                  <td>
                    <a
                      href={`http://localhost:5000/uploads/${r.file}`}
                      target="_blank"
                      className="btn btn-secondary"
                      style={{ padding: "4px 8px", fontSize: "12px", textDecoration: "none" }}
                    >
                      Download / View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-3" style={{ color: "#666" }}>Select an event to see available resources.</p>
      )}
    </div>
  );
}

export default Resources;
