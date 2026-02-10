import { useState } from "react";
import api from "../api/api"

function ChangePassword() {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.put("/users/change-password", {
        oldPassword,
        newPassword
      });

      alert("Password changed");

      setOldPassword("");
      setNewPassword("");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h3 className="mb-4">Change Password</h3>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Old Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="Enter Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-full">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
