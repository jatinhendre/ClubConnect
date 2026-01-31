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
    <form onSubmit={createEvent}>
      <h3>Create Event</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      {/* CLUB DROPDOWN */}
      <select value={clubId} onChange={(e)=>setClubId(e.target.value)}>
        <option value="">Select Club</option>

        {clubs.map((club)=>(
          <option key={club._id} value={club._id}>
            {club.clubName}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={eventDate}
        onChange={(e)=>setEventDate(e.target.value)}
      />

      <input
        type="file"
        onChange={(e)=>setPoster(e.target.files[0])}
      />

      <button>Create</button>
    </form>
  );
}

export default CreateEvent;
