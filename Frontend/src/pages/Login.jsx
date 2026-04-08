import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return setMessage("Enter email and password to continue.");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/auth/login", {
        email,
        password,
        role: "USER",
      });

      const userData = res.data;

      login(userData);

      if (userData.role === "USER") {
        navigate("/user/home");
      } else {
        setMessage("Access denied: Not a user account.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage(err.response?.data || "Invalid credentials for USER login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to Artify</h2>

        <input
          type="text"
          placeholder="Mobile number, username or email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleLogin}
          className="login-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        {message && <p className="auth-message">{message}</p>}

        <p className="forgot-password">Forgot password?</p>

        <div className="divider">
          <span>OR</span>
        </div>

        <Link to="/user/register" className="register-button">
          Create New Account
        </Link>
      </div>
    </div>
  );
};

export default Login;