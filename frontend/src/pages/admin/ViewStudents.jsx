import { useEffect, useState } from "react";
import api from "../../api/api";

function ViewStudents() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/admin/students").then((res) => {
      setStudents(res.data);
    });
  }, []);

  return (
    <div>
      <h3 className="mb-4">Students List</h3>

      <div className="card table-container">
        <table className="table-styled">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Clubs Joined</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>
                  {s.clubs.length > 0 ? (
                    s.clubs.map(c => (
                      <span key={c._id} style={{ marginRight: "8px", background: "#eee", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>
                        {c.clubName}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: "#888" }}>No clubs</span>
                  )}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStudents;
