import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "user") {
      navigate("/user/login");
    } else if (role === "artist") {
      navigate("/artist/login");
    } else if (role === "admin") {
      navigate("/admin/login");
    }
  };

  return (
    <div className="role-selection-container">
      <div className="role-selection-card">
        <h1 className="role-title">Select Your Role</h1>
        <p className="role-subtitle">Choose how you want to experience Artify</p>

        <div className="role-options">
          {/* User Role */}
          <div className="role-card" onClick={() => handleRoleSelect("user")}>
            <div className="role-icon">👨‍💼</div>
            <h2>User</h2>
            <p>Browse artworks, discover artists, and make purchases</p>
            <button className="role-button">Continue as User</button>
          </div>

          {/* Artist Role */}
          <div className="role-card" onClick={() => handleRoleSelect("artist")}>
            <div className="role-icon">🎨</div>
            <h2>Artist</h2>
            <p>Sell your artworks, manage gallery, and connect with buyers</p>
            <button className="role-button">Continue as Artist</button>
          </div>

          {/* Admin Role */}
          <div className="role-card" onClick={() => handleRoleSelect("admin")}>
            <div className="role-icon">⚙️</div>
            <h2>Admin</h2>
            <p>Manage platform, moderate content, and view analytics</p>
            <button className="role-button">Continue as Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
