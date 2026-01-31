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
      <h3>Clubs</h3>

      {clubs.map((club) => (
        <div key={club._id}>
          <h4>{club.clubName}</h4>
          <p>{club.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewClubs;
