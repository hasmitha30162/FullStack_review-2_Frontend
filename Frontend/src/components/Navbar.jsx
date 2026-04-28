import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, userName, userEmail, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fallback function to get display name
  const getDisplayName = () => {
    if (userName) return userName;
    if (userEmail) return userEmail;
    return userRole?.charAt(0).toUpperCase() + userRole?.slice(1);
  };

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
    setIsDropdownOpen(false);
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
    setIsDropdownOpen(false);
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
            <div className="user-profile-dropdown" ref={dropdownRef}>
              <button 
                className="user-profile-btn"
                onClick={toggleDropdown}
              >
                👤 {getDisplayName()}
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">Account</div>
                  
                  {userRole === "user" && (
                    <button 
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/user/wishlist");
                        setIsDropdownOpen(false);
                      }}
                    >
                      My Wishlist
                    </button>
                  )}

                  {userRole !== "admin" && (
                    <button 
                      className="dropdown-item"
                      onClick={handleSwitchRole}
                    >
                      Switch Role
                    </button>
                  )}

                  <button 
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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