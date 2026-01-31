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
    <form onSubmit={submit}>
      <h3>Change Password</h3>

      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e)=>setOldPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value)}
      />

      <button>Change</button>
    </form>
  );
}

export default ChangePassword;
