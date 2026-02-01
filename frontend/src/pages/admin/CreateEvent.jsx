import { useEffect, useState } from "react";
import api from "../../api/api";

function CreateEvent() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [poster, setPoster] = useState(null);

  const [clubs, setClubs] = useState([]);
  const [clubId, setClubId] = useState("");


  useEffect(() => {
    api.get("/clubs").then((res) => {
      setClubs(res.data);
    });
  }, []);

  const createEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("clubId", clubId);
    formData.append("eventDate", eventDate);
    formData.append("poster", poster);

    await api.post("/events", formData);
    alert("Event Created");

    setTitle("");
    setDescription("");
    setEventDate("");
    setPoster(null);
    setClubId("");
  };

  return (
    <div className="card">
      <h3 className="mb-4">Create Event</h3>
      <form onSubmit={createEvent}>
        <div className="form-group">
          <label>Event Title</label>
          <input
            className="form-input"
            placeholder="Enter Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-input"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Club</label>
          {/* CLUB DROPDOWN */}
          <select className="form-select" value={clubId} onChange={(e) => setClubId(e.target.value)}>
            <option value="">Select Club</option>

            {clubs.map((club) => (
              <option key={club._id} value={club._id}>
                {club.clubName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            className="form-input"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Poster Image</label>
          <input
            className="form-input"
            type="file"
            onChange={(e) => setPoster(e.target.files[0])}
          />
        </div>

        <button className="btn btn-primary">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
