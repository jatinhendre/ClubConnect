import { useEffect, useState } from "react";
import api from "../../api/api";

function Feedback() {

  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(res.data);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/feedback", { eventId, rating, comment });
    alert("Feedback Sent");
  };

  return (
    <div className="card">
      <h3 className="mb-4">Provide Feedback</h3>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Event</label>
          <select className="form-select" onChange={(e) => setEventId(e.target.value)}>
            <option>Select Event</option>
            {events.map(ev => (
              <option key={ev._id} value={ev._id}>{ev.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Rating (1-5)</label>
          <input
            className="form-input"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Comments</label>
          <textarea
            className="form-input"
            placeholder="Share your experience..."
            rows={4}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
