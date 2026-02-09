import { useEffect, useState } from "react";
import api from "../../api/api";

function Registrations() {

  const [regs, setRegs] = useState([]);

  useEffect(() => {
    loadRegs();
  }, []);

  const loadRegs = async () => {
    const res = await api.get("/registrations");
    setRegs(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/registrations/${id}`, { status });
    loadRegs();
  };

  const generateCertificate = async (studentId, eventId) => {
    try {
      await api.post("/certificates/generate", {
        studentId,
        eventId
      });
      alert("Certificate Generated");
    } catch (err) {
      alert(err.response?.data?.message || "Already generated");
    }
  };

  const statusStyle = (status) => ({
    padding: "4px 10px",
    borderRadius: "5px",
    fontSize: "12px",
    fontWeight: "bold",
    background:
      status === "approved"
        ? "#d4edda"
        : status === "rejected"
          ? "#f8d7da"
          : "#fff3cd",
    color:
      status === "approved"
        ? "#155724"
        : status === "rejected"
          ? "#721c24"
          : "#856404"
  });

  return (
    <div>
      <h3>Event Registrations</h3>

      <div className="table-container">
        <table className="table-styled">

          <thead>
            <tr>
              <th>Student</th>
              <th>Event</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {regs.map((r) => (
              <tr key={r._id}>

                <td>{r.studentId?.name}</td>
                <td>{r.eventId?.title}</td>

                <td>
                  <span style={statusStyle(r.status)}>
                    {r.status.toUpperCase()}
                  </span>
                </td>

                <td>

                  {/* PENDING */}
                  {r.status === "pending" && (
                    <>
                      <button
                        className="btn-primary"
                        onClick={() => updateStatus(r._id, "approved")}
                      >
                        Approve
                      </button>

                      <button
                        className="btn-danger"
                        onClick={() => updateStatus(r._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {/* APPROVED */}
                  {r.status === "approved" && (
                    <button
                      className="btn-success"
                      onClick={() =>
                        generateCertificate(
                          r.studentId._id,
                          r.eventId._id
                        )
                      }
                    >
                      Generate Certificate
                    </button>
                  )}

                  {/* REJECTED */}
                  {r.status === "rejected" && <span>—</span>}

                </td>

              </tr>
            ))}

            {regs.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No registrations found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Registrations;
