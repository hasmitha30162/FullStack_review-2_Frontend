import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, logout } = useAuth();

  const isUserPage = location.pathname.startsWith("/user");
  const isArtistPage = location.pathname.startsWith("/artist");
  const isAdminPage = location.pathname.startsWith("/admin");

  const isLoginPage =
    location.pathname === "/user/login" ||
    location.pathname === "/user/register" ||
    location.pathname === "/artist/login" ||
    location.pathname === "/artist/register" ||
    location.pathname === "/admin/login";

  const handleSwitchRole = () => {
    logout();

    if (userRole === "user") {
      navigate("/artist/login");
    } else if (userRole === "artist") {
      navigate("/user/login");
    } else {
      navigate("/");
    }

    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-top">
        <Link to="/" className="logo">
          🎨 Artify
        </Link>

        {!isLoginPage && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search artworks, artists..."
              className="search-input"
            />
          </div>
        )}

        <div className="auth-buttons">
          {userRole ? (
            <>
              <span className="role-badge">{userRole.toUpperCase()}</span>

              {userRole !== "admin" && (
                <button onClick={handleSwitchRole} className="role-select-btn">
                  Switch Role
                </button>
              )}

              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/user/login" className="login-btn">Log In</Link>
              <Link to="/user/register" className="signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {isUserPage && userRole === "user" && (
        <div className="navbar-bottom user-nav">
          <Link to="/user/home">📚 Home</Link>
          <Link to="/user/whatsnew">✨ What's New</Link>
          <Link to="/user/artworks">🖼️ Artworks</Link>
          <Link to="/user/artists">🎨 Artists</Link>
          <Link to="/user/auctions">🔨 Auctions</Link>
        </div>
      )}

      {isArtistPage && userRole === "artist" && (
        <div className="navbar-bottom artist-nav">
          <Link to="/artist/dashboard">📊 Dashboard</Link>
          <Link to="/artist/gallery">🎨 My Gallery</Link>
          <Link to="/artist/upload">📤 Upload</Link>
          <Link to="/artist/manage">📋 Manage</Link>
        </div>
      )}

      {isAdminPage && userRole === "admin" && (
        <div className="navbar-bottom admin-nav">
          <Link to="/admin/dashboard">📊 Dashboard</Link>
          <Link to="/admin/users">👥 Users</Link>
          <Link to="/admin/artists">🎨 Artists</Link>
          <Link to="/admin/artworks">🖼️ Artworks</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;