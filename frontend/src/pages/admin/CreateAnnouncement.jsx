import { useState, useEffect } from "react";
import api from "../../api/api";

function CreateAnnouncement() {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [clubId, setClubId] = useState("");
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Load clubs
    api.get("/clubs").then(res => {
      setClubs(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !message || !clubId) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      const res = await api.post("/announcements", {
        title,
        message,
        clubId
      });

      setSuccess(`Announcement sent to ${res.data.memberCount} members!`);
      setTitle("");
      setMessage("");
      setClubId("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="mb-4">Create Announcement</h3>

      <div className="card">
        {success && (
          <div style={{ 
            padding: "12px", 
            background: "#d4edda", 
            color: "#155724", 
            borderRadius: "8px",
            marginBottom: "16px"
          }}>
            {success}
          </div>
        )}

        {error && (
          <div style={{ 
            padding: "12px", 
            background: "#f8d7da", 
            color: "#721c24", 
            borderRadius: "8px",
            marginBottom: "16px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Club</label>
            <select
              className="form-input"
              value={clubId}
              onChange={(e) => setClubId(e.target.value)}
            >
              <option value="">-- Select Club --</option>
              {clubs.map(club => (
                <option key={club._id} value={club._id}>
                  {club.clubName} ({club.members?.length || 0} members)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Announcement Title</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              className="form-input"
              placeholder="Enter announcement message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>

          <button 
            className="btn btn-primary" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Announcement"}
          </button>
        </form>
      </div>

      <div className="card" style={{ marginTop: "20px" }}>
        <h4>How it works:</h4>
        <ul style={{ color: "#666", lineHeight: "1.8" }}>
          <li>Select a club from the dropdown</li>
          <li>Write your announcement title and message</li>
          <li>Click "Send Announcement"</li>
          <li>All members of the selected club will receive an email notification</li>
        </ul>
      </div>
    </div>
  );
}

export default CreateAnnouncement;
