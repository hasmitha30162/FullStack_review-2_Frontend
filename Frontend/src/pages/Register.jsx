import { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      return setMessage("Fill in all fields before sending OTP.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return setMessage("Enter a valid email address.");
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
        role: "USER",
      });

      setOtpSent(true);
      setOtpVerified(false);
      setEnteredOtp("");
      setMessage(res.data || "OTP sent to your email.");
    } catch (err) {
      console.error("Signup error:", err);
      setMessage(err.response?.data || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!enteredOtp.trim()) {
      return setMessage("Please enter the OTP before verifying.");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post(
        `/auth/verify?email=${encodeURIComponent(email)}&role=USER&otp=${encodeURIComponent(enteredOtp)}`
      );

      setOtpVerified(true);
      setMessage(res.data || "Account verified successfully!");

      setTimeout(() => {
        navigate("/user/login");
      }, 1200);
    } catch (err) {
      console.error("OTP verify error:", err);
      setOtpVerified(false);
      setMessage(err.response?.data || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="auth-input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="auth-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="auth-action-row">
          <button
            type="button"
            className="auth-secondary-btn"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading && !otpSent ? "Sending..." : "Send OTP"}
          </button>

          {otpSent && !otpVerified && (
            <button
              type="button"
              className="auth-secondary-btn"
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
            className="auth-input"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
          />
        )}

        <button
          type="button"
          className="auth-btn"
          disabled
        >
          Register
        </button>

        {message && <p className="auth-message">{message}</p>}

        <p className="switch-text">
          Already have an account?{" "}
          <Link to="/user/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;