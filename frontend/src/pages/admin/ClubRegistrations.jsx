import { useEffect, useState } from "react";
import api from "../../api/api";

function ClubRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = () => {
    api.get("/club-registrations")
      .then(res => {
        setRegistrations(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleStatusUpdate = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this registration?`)) {
      return;
    }

    try {
      await api.patch(`/club-registrations/${id}`, { status });
      alert(`Registration ${status} successfully!`);
      fetchRegistrations();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    if (filter === "all") return true;
    return reg.status === filter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      pending: { background: "#FFA500", color: "white" },
      approved: { background: "#22C55E", color: "white" },
      rejected: { background: "#EF4444", color: "white" }
    };

    return (
      <span style={{
        ...styles[status],
        padding: "6px 16px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        textTransform: "capitalize"
      }}>
        {status}
      </span>
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "24px" 
      }}>
        <h3 style={{ margin: 0 }}>Club Registrations</h3>
        
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            className={filter === "all" ? "btn-primary" : "btn-secondary"}
            onClick={() => setFilter("all")}
            style={{ padding: "8px 20px" }}
          >
            All ({registrations.length})
          </button>
          <button
            className={filter === "pending" ? "btn-primary" : "btn-secondary"}
            onClick={() => setFilter("pending")}
            style={{ padding: "8px 20px" }}
          >
            Pending ({registrations.filter(r => r.status === "pending").length})
          </button>
          <button
            className={filter === "approved" ? "btn-primary" : "btn-secondary"}
            onClick={() => setFilter("approved")}
            style={{ padding: "8px 20px" }}
          >
            Approved ({registrations.filter(r => r.status === "approved").length})
          </button>
          <button
            className={filter === "rejected" ? "btn-primary" : "btn-secondary"}
            onClick={() => setFilter("rejected")}
            style={{ padding: "8px 20px" }}
          >
            Rejected ({registrations.filter(r => r.status === "rejected").length})
          </button>
        </div>
      </div>

      {filteredRegistrations.length === 0 ? (
        <div className="card">
          <p className="muted-text">No {filter !== "all" ? filter : ""} registrations found.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {filteredRegistrations.map(reg => (
            <div key={reg._id} className="card">
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "20px",
                alignItems: "start"
              }}>
                <div>
                  <div style={{ 
                    display: "flex", 
                    gap: "12px", 
                    alignItems: "center",
                    marginBottom: "16px" 
                  }}>
                    <h4 style={{ margin: 0 }}>{reg.studentName}</h4>
                    {getStatusBadge(reg.status)}
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                    marginBottom: "12px"
                  }}>
                    <div>
                      <p style={{ 
                        color: "var(--text-secondary)", 
                        fontSize: "0.85rem",
                        marginBottom: "4px" 
                      }}>
                        Club
                      </p>
                      <p style={{ 
                        fontWeight: "600",
                        color: "var(--primary)",
                        marginBottom: "0"
                      }}>
                        {reg.clubId?.clubName || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p style={{ 
                        color: "var(--text-secondary)", 
                        fontSize: "0.85rem",
                        marginBottom: "4px" 
                      }}>
                        Email
                      </p>
                      <p style={{ marginBottom: "0" }}>
                        {reg.studentId?.email || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p style={{ 
                        color: "var(--text-secondary)", 
                        fontSize: "0.85rem",
                        marginBottom: "4px" 
                      }}>
                        Class/Year
                      </p>
                      <p style={{ marginBottom: "0" }}>
                        {reg.class}
                      </p>
                    </div>

                    <div>
                      <p style={{ 
                        color: "var(--text-secondary)", 
                        fontSize: "0.85rem",
                        marginBottom: "4px" 
                      }}>
                        Contact
                      </p>
                      <p style={{ marginBottom: "0" }}>
                        {reg.contactDetails}
                      </p>
                    </div>
                  </div>

                  <p style={{ 
                    color: "var(--text-muted)", 
                    fontSize: "0.85rem",
                    marginBottom: "0"
                  }}>
                    Registered on: {new Date(reg.createdAt).toLocaleString()}
                  </p>
                </div>

                {reg.status === "pending" && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      className="btn-primary"
                      onClick={() => handleStatusUpdate(reg._id, "approved")}
                      style={{ 
                        padding: "8px 20px",
                        fontSize: "14px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => handleStatusUpdate(reg._id, "rejected")}
                      style={{ 
                        padding: "8px 20px",
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                        background: "#EF4444",
                        color: "white"
                      }}
                    >
                      ✗ Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClubRegistrations;
