import { useEffect, useState } from "react";
import api from "../../api/api";

function MyCertificates() {

  const [certs, setCerts] = useState([]);

  useEffect(() => {
    api.get("/certificates/my").then((res)=>{
      setCerts(res.data);
    });
  }, []);

  return (
    <div>
      <h3>My Certificates</h3>

      {certs.map(c=>(
        <div key={c._id}>
          <p>{c.eventId.title}</p>
          <a
            href={`http://localhost:5000/uploads/${c.file}`}
            target="_blank"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}

export default MyCertificates;
