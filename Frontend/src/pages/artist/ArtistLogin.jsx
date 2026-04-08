import { useState } from "react";
import "./ArtistAuth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const ArtistLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return setMessage("Enter artist email and password to continue.");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/auth/login", {
        email,
        password,
        role: "ARTIST",
      });

      const userData = res.data;

      if (userData.role?.toUpperCase() !== "ARTIST") {
        setMessage("Access denied: Not an artist account.");
        return;
      }

      login(userData);
      navigate("/artist/dashboard");
    } catch (err) {
      console.error("Artist login error:", err);
      setMessage(err.response?.data || "Invalid credentials for ARTIST login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="artist-auth-container">
      <div className="artist-auth-card">
        <h2 className="artist-auth-title">Artist Login</h2>

        <input
          type="text"
          placeholder="Email"
          className="artist-auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="artist-auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleLogin}
          className="artist-auth-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        {message && <p className="artist-auth-message">{message}</p>}

        <p className="forgot-password">Forgot password?</p>

        <div className="divider">
          <span>OR</span>
        </div>

        <Link to="/artist/register" className="artist-register-button">
          Create Artist Account
        </Link>
      </div>
    </div>
  );
};

export default ArtistLogin;