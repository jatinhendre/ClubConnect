import { useState } from "react";
import api from "../../api/api";

function CreateStudent() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const createStudent = async (e) => {
    e.preventDefault();

    try {
      await api.post("/students/create", {
        name,
        email
      });

      alert("Student created & email sent");

      setName("");
      setEmail("");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating student");
    }
  };

  return (
    <form onSubmit={createStudent}>
      <h3>Create Student</h3>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        placeholder="Student Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <button>Create Student</button>
    </form>
  );
}

export default CreateStudent;
