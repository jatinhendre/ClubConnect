import { useEffect, useState } from "react";
import api from "../../api/api"; // Ensure this path is correct based on your file structure

function ViewEvents() {
  const [events, setEvents] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    api.get("/events").then((res) => {
      setEvents(res.data);
    }).catch(err => console.error("Error fetching events:", err));
  };

  const handleViewFeedback = async (eventId) => {
    setLoadingFeedback(true);
    setShowModal(true);
    setSelectedFeedback([]); // Clear previous feedback

    try {
      const res = await api.get(`/feedback/${eventId}`);
      setSelectedFeedback(res.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      alert("Failed to fetch feedback.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFeedback([]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <h3 className="mb-4">All Events</h3>

      <div className="card table-container">
        <table className="table-styled">
          <thead>
            <tr>
              <th>Title</th>
              <th>Club</th>
              <th>Event Date</th>
              <th>Description</th>
              <th>Poster</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{event.clubId?.clubName || "N/A"}</td>
                <td>{formatDate(event.eventDate)}</td>
                <td style={{ maxWidth: "300px" }}>{event.description}</td>
                <td>
                  {event.poster ? (
                    <img
                      src={`http://localhost:5000/uploads/${event.poster}`}
                      alt={event.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <span className="text-secondary">No poster</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleViewFeedback(event._id)}
                    className="btn-sm btn-primary"
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    View Feedback
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "var(--z-modal)",
            padding: "var(--space-4)",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "var(--bg-surface)",
              color: "var(--text-primary)",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-2xl)",
              display: "flex",
              flexDirection: "column",
              maxHeight: "85vh",
              animation: "fadeIn 0.2s ease-out",
              border: "1px solid var(--border-light)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "var(--space-5) var(--space-6)",
                borderBottom: "1px solid var(--border-light)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "var(--text-xl)", color: "var(--text-primary)" }}>
                Event Feedback
              </h3>
              <button
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  fontSize: "1.5rem",
                  lineHeight: 1,
                  cursor: "pointer",
                  padding: "var(--space-1)",
                  borderRadius: "var(--radius-md)",
                  transition: "var(--transition-fast)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-hover)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div
              style={{
                padding: "0 var(--space-6)",
                overflowY: "auto",
                flex: 1,
              }}
            >
              {loadingFeedback ? (
                <div style={{ padding: "var(--space-8) 0", textAlign: "center", color: "var(--text-secondary)" }}>
                  <div className="spinner-border text-primary" role="status" style={{ marginBottom: "var(--space-3)" }}>
                    {/* Add a spinner if available in CSS or use text */}
                  </div>
                  <p>Loading feedback...</p>
                </div>
              ) : selectedFeedback.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {selectedFeedback.map((fb, index) => (
                    <li
                      key={index}
                      style={{
                        padding: "var(--space-5) 0",
                        borderBottom: index !== selectedFeedback.length - 1 ? "1px solid var(--border-light)" : "none",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
                        <span style={{ fontWeight: "var(--font-semibold)", color: "var(--text-primary)" }}>
                          {fb.studentId?.name || "Anonymous"}
                        </span>
                        <div style={{ display: "flex", gap: "2px" }}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ color: i < fb.rating ? "#F59E0B" : "var(--gray-300)", fontSize: "0.9rem" }}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)" }}>
                        {fb.comment || <em style={{ color: "var(--text-muted)" }}>No comment provided.</em>}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ padding: "var(--space-8) 0", textAlign: "center", color: "var(--text-muted)" }}>
                  <p>No feedback received for this event yet.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "var(--space-4) var(--space-6)",
                borderTop: "1px solid var(--border-light)",
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "var(--bg-surface)", // Ensure it matches modal bg
                borderBottomLeftRadius: "var(--radius-xl)",
                borderBottomRightRadius: "var(--radius-xl)",
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  padding: "var(--space-2) var(--space-4)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "var(--bg-surface)",
                  color: "var(--text-primary)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-medium)",
                  cursor: "pointer",
                  transition: "var(--transition-fast)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-hover)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-surface)")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewEvents;
