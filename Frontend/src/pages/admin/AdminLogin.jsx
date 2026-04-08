import { useState } from "react";
import "./AdminAuth.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return setMessage("Enter admin email and password.");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/auth/login", {
        email,
        password,
        role: "ADMIN",
      });

      const userData = res.data;

      login(userData);

      if (userData.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        setMessage("Access denied: Not an admin account.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setMessage(err.response?.data || "Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-card">
        <h2 className="admin-auth-title">Admin Login</h2>

        <input
          type="text"
          placeholder="Admin Email"
          className="admin-auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          className="admin-auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleLogin}
          className="admin-auth-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login to Dashboard"}
        </button>

        {message && <p className="admin-only">{message}</p>}

        <p className="forgot-password">Forgot credentials?</p>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="admin-only">⚠️ Admin access only</p>
      </div>
    </div>
  );
};

export default AdminLogin;