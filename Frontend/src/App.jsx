import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// User Module
import UserLogin from "./pages/Login";
import UserHome from "./pages/Home";
import UserArtworks from "./pages/Artworks";
import UserArtists from "./pages/Artists";
import UserRegister from "./pages/Register";
import UserWhatsNew from "./pages/Whatsnew";
import UserAuctions from "./pages/Auctions";
import Wishlist from "./pages/Wishlist";

// Common
import RoleSelection from "./pages/common/RoleSelection";

// Artist Module
import ArtistLogin from "./pages/artist/ArtistLogin";
import ArtistRegister from "./pages/artist/ArtistRegister";
import ArtistDashboard from "./pages/artist/ArtistDashboard";
import MyGallery from "./pages/artist/MyGallery";
import UploadArtwork from "./pages/artist/UploadArtwork";
import ManageArtworks from "./pages/artist/ManageArtworks";

// Admin Module
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageArtists from "./pages/admin/ManageArtists";
import AdminManageArtworks from "./pages/admin/AdminManageArtworks";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <Routes>
          {/* Landing Page - Role Selection */}
          <Route path="/" element={<RoleSelection />} />

          {/* ========== USER MODULE (Protected) ========== */}
          <Route
            path="/user/login"
            element={<UserLogin />}
          />
          <Route
            path="/user/register"
            element={<UserRegister />}
          />
          <Route
            path="/user/home"
            element={
              <ProtectedRoute requiredRole="user">
                <UserHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/artworks"
            element={
              <ProtectedRoute requiredRole="user">
                <UserArtworks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/artists"
            element={
              <ProtectedRoute requiredRole="user">
                <UserArtists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/whatsnew"
            element={
              <ProtectedRoute requiredRole="user">
                <UserWhatsNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/auctions"
            element={
              <ProtectedRoute requiredRole="user">
                <UserAuctions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/wishlist"
            element={
              <ProtectedRoute requiredRole="user">
                <Wishlist />
              </ProtectedRoute>
            }
          />

          {/* ========== ARTIST MODULE (Protected) ========== */}
          <Route
            path="/artist/login"
            element={<ArtistLogin />}
          />
          <Route
            path="/artist/register"
            element={<ArtistRegister />}
          />
          <Route
            path="/artist/dashboard"
            element={
              <ProtectedRoute requiredRole="artist">
                <ArtistDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist/gallery"
            element={
              <ProtectedRoute requiredRole="artist">
                <MyGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist/upload"
            element={
              <ProtectedRoute requiredRole="artist">
                <UploadArtwork />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist/manage"
            element={
              <ProtectedRoute requiredRole="artist">
                <ManageArtworks />
              </ProtectedRoute>
            }
          />

          {/* ========== ADMIN MODULE (Protected) ========== */}
          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/artists"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageArtists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/artworks"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminManageArtworks />
              </ProtectedRoute>
            }
          />

          {/* Catch-all: Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;