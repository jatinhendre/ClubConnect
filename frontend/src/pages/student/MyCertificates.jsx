import { useEffect, useState } from "react";
import api from "../../api/api";
import { useAlert } from "../../context/AlertContext";

function MyCertificates() {

  const [certs, setCerts] = useState([]);
  const { showAlert } = useAlert();

  useEffect(() => {
    api.get("/certificates/my").then((res) => {
      setCerts(res.data);
    });
  }, []);

  const downloadCert = async (certId) => {
    try {
      const res = await api.get(`/certificates/download/${certId}`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      showAlert("Failed to download certificate", "error");
    }
  };

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
                  <button
                    onClick={() => downloadCert(c._id)}
                    className="btn btn-primary"
                    style={{ padding: "4px 10px", fontSize: "12px" }}
                  >
                    Download
                  </button>
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
