import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.jsx"
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", {
      email,
      password
    });

    login(res.data);

    if (res.data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/student");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

export default Login;
