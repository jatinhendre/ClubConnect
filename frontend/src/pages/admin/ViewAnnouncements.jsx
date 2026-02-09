import { useState, useEffect } from "react";
import api from "../../api/api";

function ViewAnnouncements() {

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const res = await api.get("/announcements/all");
      setAnnouncements(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAnnouncement = async (id) => {
    if (!confirm("Are you sure you want to delete this announcement?")) {
      return;
    }

    try {
      await api.delete(`/announcements/${id}`);
      loadAnnouncements();
    } catch (error) {
      alert("Failed to delete announcement");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3 className="mb-4">All Announcements</h3>

      {announcements.length === 0 && (
        <div className="card">
          <p className="muted-text">No announcements yet.</p>
        </div>
      )}

      {announcements.map(announcement => (
        <div key={announcement._id} className="card" style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ marginBottom: "8px", color: "var(--primary)" }}>
                {announcement.title}
              </h4>

              <p className="text-secondary" style={{ fontSize: "14px", marginBottom: "12px" }}>
                <strong>Club:</strong> {announcement.clubId?.clubName} |
                <strong> Posted by:</strong> {announcement.createdBy?.name} |
                <strong> Date:</strong> {formatDate(announcement.createdAt)}
              </p>

              <p style={{ lineHeight: "1.6" }}>
                {announcement.message}
              </p>
            </div>

            <button
              className="btn-danger"
              onClick={() => deleteAnnouncement(announcement._id)}
              style={{ marginLeft: "16px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewAnnouncements;
