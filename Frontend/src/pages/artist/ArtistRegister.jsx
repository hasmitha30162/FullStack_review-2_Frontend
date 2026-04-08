import { useState } from "react";
import "./ArtistAuth.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const ArtistRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!fullName || !email || !username || !password || !confirmPassword) {
      return setMessage("Fill all fields before sending OTP.");
    }

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/auth/signup", {
        name: fullName,
        email,
        password,
        role: "ARTIST",
      });

      setOtpSent(true);
      setOtpVerified(false);
      setEnteredOtp("");
      setMessage(res.data || "OTP sent to your email.");
    } catch (err) {
      console.error("Artist signup error:", err);
      setMessage(err.response?.data || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!enteredOtp.trim()) {
      return setMessage("Enter OTP first.");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post(
        `/auth/verify?email=${encodeURIComponent(email)}&role=ARTIST&otp=${encodeURIComponent(enteredOtp)}`
      );

      setOtpVerified(true);
      setMessage(res.data || "Artist account verified!");

      setTimeout(() => {
        navigate("/artist/login");
      }, 1200);
    } catch (err) {
      console.error("Artist OTP verify error:", err);
      setOtpVerified(false);
      setMessage(err.response?.data || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="artist-auth-container">
      <div className="artist-auth-card">
        <h2 className="artist-auth-title">Create Artist Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="artist-auth-input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="artist-auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          className="artist-auth-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="artist-auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="artist-auth-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="artist-action-row">
          <button
            type="button"
            className="artist-secondary-btn"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading && !otpSent ? "Sending..." : "Send OTP"}
          </button>

          {otpSent && !otpVerified && (
            <button
              type="button"
              className="artist-secondary-btn"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          )}
        </div>

        {otpSent && !otpVerified && (
          <input
            type="text"
            placeholder="Enter OTP"
            className="artist-auth-input"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
          />
        )}

        <button type="button" className="artist-auth-button" disabled>
          Create Account
        </button>

        {message && <p className="artist-auth-message">{message}</p>}

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/artist/login" className="link">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ArtistRegister;