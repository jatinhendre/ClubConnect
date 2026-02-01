import { useEffect, useState } from "react";
import api from "../../api/api";

function UploadResource() {

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [eventId, setEventId] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  const upload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("eventId", eventId);
    formData.append("file", file);

    await api.post("/resources", formData);
    alert("Uploaded");
  };

  return (
    <div className="card">
      <h3 className="mb-4">Upload Resource</h3>
      <form onSubmit={upload}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-input"
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Event</label>
          <select className="form-select" onChange={(e) => setEventId(e.target.value)}>
            <option value="">Select Event</option>
            {events.map(ev => (
              <option key={ev._id} value={ev._id}>
                {ev.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Resource File</label>
          <input
            className="form-input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button className="btn btn-primary">Upload Resource</button>
      </form>
    </div>
  );
}

export default UploadResource;
