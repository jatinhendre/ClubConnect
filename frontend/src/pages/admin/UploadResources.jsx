import { useEffect, useState } from "react";
import api from "../../api/api";

function UploadResource() {

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [eventId, setEventId] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    api.get("/events").then((res)=>{
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
    <form onSubmit={upload}>
      <h3>Upload Resource</h3>

      <input placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />

      <select onChange={(e)=>setEventId(e.target.value)}>
        <option value="">Select Event</option>
        {events.map(ev=>(
          <option key={ev._id} value={ev._id}>
            {ev.title}
          </option>
        ))}
      </select>

      <input type="file" onChange={(e)=>setFile(e.target.files[0])} />

      <button>Upload</button>
    </form>
  );
}

export default UploadResource;
