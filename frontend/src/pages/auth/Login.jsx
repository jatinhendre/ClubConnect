import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return setError("All fields are required");
    }

    if (!isValidEmail(trimmedEmail)) {
      return setError("Please enter a valid email");
    }

    if (trimmedPassword.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email: trimmedEmail,
        password: trimmedPassword
      });

      login(res.data);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
      padding: "20px"
    }}>
      <div className="card" style={{ width: "100%", maxWidth: "420px" }}>
        
        <div className="text-center mb-4">
          <h1 style={{ fontSize: "2rem", color: "var(--primary)" }}>
            Welcome Back
          </h1>
          <p className="muted-text">Sign in to access your dashboard</p>
        </div>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label>Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-full"
            style={{ padding: "12px" }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
