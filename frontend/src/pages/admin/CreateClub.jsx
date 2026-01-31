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
    <form onSubmit={createClub}>
      <h3>Create Club</h3>

      <input
        placeholder="Club Name"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Create</button>
    </form>
  );
}

export default CreateClub;
