import { useEffect, useState } from "react";
import api from "../../api/api";

function ViewClubs() {

  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    api.get("/clubs").then((res) => {
      setClubs(res.data);
    });
  }, []);

  return (
    <div>
      <h3 className="mb-4">Clubs</h3>

      <div className="grid-container">
        {clubs.map((club) => (
          <>
          <div key={club._id} className="card">
            <h4 className="mb-2">{club.clubName}</h4>
            <p style={{ color: "#666" }}>{club.description}</p>
          </div>
          <br></br><br></br>
          </>
        ))}
      </div>
      {clubs.length === 0 && (
        <p className="text-center">No clubs found.</p>
      )}
    </div>
  );
}

export default ViewClubs;
