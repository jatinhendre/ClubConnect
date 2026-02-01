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
    <div className="card">
      <h3 className="mb-4">Create Student</h3>
      <form onSubmit={createStudent}>
        <div className="form-group">
          <label>Student Name</label>
          <input
            className="form-input"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            className="form-input"
            placeholder="Enter Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Create Student</button>
      </form>
    </div>
  );
}

export default CreateStudent;
