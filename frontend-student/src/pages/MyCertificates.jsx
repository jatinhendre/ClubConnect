import { useEffect, useState } from "react";
import api from "../api/api";

function MyCertificates() {

  const [certs, setCerts] = useState([]);

  useEffect(() => {
    api.get("/certificates/my").then((res) => {
      setCerts(res.data);
    });
  }, []);

  return (
    <div>
      <h3 className="mb-4">My Certificates</h3>

      <div className="card table-container">
        <table className="table-styled">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {certs.map(c => (
              <tr key={c._id}>
                <td>{c.eventId?.title ? c.eventId.title : "Event"}</td>
                <td>
                  <a
                    href={`http://localhost:5000/uploads/${c.file}`}
                    target="_blank"
                    className="btn btn-primary"
                    style={{ padding: "4px 10px", fontSize: "12px", textDecoration: "none" }}
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
            {certs.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center">No certificates found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyCertificates;
