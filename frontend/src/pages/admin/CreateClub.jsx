import { useState } from "react";
import api from "../../api/api";

function CreateClub() {

  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");

  const createClub = async (e) => {
    e.preventDefault();
    await api.post("/clubs", { clubName, description });
    alert("Club Created");
    setClubName("");
    setDescription("");
  };

  return (
    <div className="card">
      <h3 className="mb-4">Create Club</h3>
      <form onSubmit={createClub}>
        <div className="form-group">
          <label>Club Name</label>
          <input
            className="form-input"
            placeholder="Enter Club Name"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-input"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <button className="btn btn-primary">Create Club</button>
      </form>
    </div>
  );
}

export default CreateClub;
