import { useEffect, useState } from "react";
import api from "../api/api";

function ViewClubs() {

  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    api.get("/clubs").then(res => {
      setClubs(res.data);
    });
  }, []);

  const loadClub = async (id) => {
    const res = await api.get(`/clubs/${id}`);
    setSelectedClub(res.data);
  };

  return (
    <div className="club-layout">

      {/* LEFT - CLUB LIST */}
      <div>
        <h3>Clubs</h3>
        <br></br>
        {clubs.map(c => (
          <>
            <div
              key={c._id}
              className={`card club-item ${selectedClub?._id === c._id ? "card-active" : ""}`}
              onClick={() => loadClub(c._id)}
            >
              {c.clubName}
            </div>
            <br></br>
          </>
        ))}
      </div>

      {/* RIGHT - MEMBERS */}
      <div>
        {selectedClub && (
          <div className="card">

            <h3>{selectedClub.clubName} Members</h3>

            {selectedClub.members.length === 0 && (
              <p className="muted-text">No students joined yet</p>
            )}

            {selectedClub.members.map(s => (
              <div key={s._id} className="member-row">
                {s.name} - {s.email}
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}

export default ViewClubs;
