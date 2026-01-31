import { useEffect, useState } from "react";
import api from "../../api/api";

function Feedback() {

  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    api.get("/events").then((res)=>{
      setEvents(res.data);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/feedback", { eventId, rating, comment });
    alert("Feedback Sent");
  };

  return (
    <form onSubmit={submit}>
      <h3>Feedback</h3>

      <select onChange={(e)=>setEventId(e.target.value)}>
        <option>Select Event</option>
        {events.map(ev=>(
          <option key={ev._id} value={ev._id}>{ev.title}</option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e)=>setRating(e.target.value)}
      />

      <textarea onChange={(e)=>setComment(e.target.value)} />

      <button>Submit</button>
    </form>
  );
}

export default Feedback;
