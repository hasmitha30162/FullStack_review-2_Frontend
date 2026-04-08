# Artify Frontend - Role-Based Routing Guide

## ✅ Routing Issues Fixed

This document outlines the complete role-based routing system implemented to prevent cross-module access and ensure proper navigation.

---

## 🔐 Authentication System

### AuthContext (`src/context/AuthContext.jsx`)
- Manages global user role state
- Stores role in localStorage for persistence
- Provides `useAuth()` hook for components

### ProtectedRoute (`src/components/ProtectedRoute.jsx`)
- Guards all protected routes
- Verifies user role matches required role
- Redirects unauthorized access:
  - User trying to access Artist/Admin → redirects to `/user/home`
  - Artist trying to access User/Admin → redirects to `/artist/dashboard`
  - Admin trying to access User/Artist → redirects to `/admin/dashboard`
  - No role → redirects to `/`

---

## 📍 Complete Route Structure

### Landing Page
```
GET /               → RoleSelection (public)
```

### User Module (`/user/*`)
Authentication (Public):
```
GET /user/login     → UserLogin
GET /user/register  → UserRegister
```

Protected Routes (Role: user):
```
GET /user/home      → UserHome
GET /user/artworks  → UserArtworks
GET /user/artists   → UserArtists
GET /user/whatsnew  → UserWhatsNew
GET /user/auctions  → UserAuctions
```

### Artist Module (`/artist/*`)
Authentication (Public):
```
GET /artist/login   → ArtistLogin
GET /artist/register → ArtistRegister
```

Protected Routes (Role: artist):
```
GET /artist/dashboard  → ArtistDashboard
GET /artist/gallery    → MyGallery
GET /artist/upload     → UploadArtwork
GET /artist/manage     → ManageArtworks
```

### Admin Module (`/admin/*`)
Authentication (Public):
```
GET /admin/login    → AdminLogin
```

Protected Routes (Role: admin):
```
GET /admin/dashboard  → AdminDashboard
GET /admin/users      → ManageUsers
GET /admin/artists    → ManageArtists
GET /admin/artworks   → AdminManageArtworks
```

---

## 🔄 Navigation Flow

### User Flow
1. User opens app → `/`
2. Clicks "Continue as User" → `/user/login`
3. Logs in → `login("user")` called → redirects to `/user/home`
4. Navigation bar shows only User links
5. Click "Switch Role" → clears role → redirects to `/`
6. Click logout → clears role → redirects to `/`

### Artist Flow
1. User opens app → `/`
2. Clicks "Continue as Artist" → `/artist/login`
3. Logs in → `login("artist")` called → redirects to `/artist/dashboard`
4. Navigation bar shows only Artist links
5. Can access: `/artist/gallery`, `/artist/upload`, `/artist/manage`
6. Cannot access `/user/*` or `/admin/*` → redirects to `/artist/dashboard`

### Admin Flow
1. User opens app → `/`
2. Clicks "Continue as Admin" → `/admin/login`
3. Logs in → `login("admin")` called → redirects to `/admin/dashboard`
4. Navigation bar shows only Admin links
5. Can access: `/admin/users`, `/admin/artists`, `/admin/artworks`
6. Cannot access `/user/*` or `/artist/*` → redirects to `/admin/dashboard`

---

## 🛡️ Cross-Access Prevention

### How It Works
1. **ProtectedRoute Component** wraps all protected pages
2. Checks current user role against required role
3. If roles don't match, redirects to appropriate dashboard:
   ```jsx
   <Route
     path="/admin/dashboard"
     element={
       <ProtectedRoute requiredRole="admin">
         <AdminDashboard />
       </ProtectedRoute>
     }
   />
   ```

### Example Scenarios

**Scenario 1: User tries to access Admin pages**
- User logs in with role "user"
- Navigates to `/admin/dashboard`
- ProtectedRoute detects mismatch
- Redirects to `/user/home`

**Scenario 2: Artist tries to access User pages**
- Artist logs in with role "artist"
- Navigates to `/user/artworks`
- ProtectedRoute detects mismatch
- Redirects to `/artist/dashboard`

**Scenario 3: No role and tries to access protected page**
- User clicks protected route link without logging in
- ProtectedRoute detects no role
- Redirects to `/` (Role Selection)

---

## 📋 Updated Components

### App.jsx
- Added AuthProvider wrapper
- Reorganized routes with /user/, /artist/, /admin/ prefixes
- Wrapped protected routes with ProtectedRoute component
- Added catch-all route for unknown paths

### Navbar.jsx
- Uses useAuth() to get current role
- Shows role badge when logged in
- Displays "Switch Role" and "Logout" buttons
- Shows only module-specific navigation links
- Hides search on login/register pages

### Login & Register Pages
- User Login (`/pages/Login.jsx`) - calls `login("user")`
- Artist Login (`/pages/artist/ArtistLogin.jsx`) - calls `login("artist")`
- Admin Login (`/pages/admin/AdminLogin.jsx`) - calls `login("admin")`
- All handle logout via role removal

### RoleSelection.jsx
- Redirects to `/user/login`, `/artist/login`, `/admin/login`

---

## 🔌 localStorage Management

### Stored Data
```javascript
localStorage.getItem("userRole")  // "user" | "artist" | "admin" | null
```

### When Data Changes
- **Login**: `login(role)` → stores role
- **Logout**: `logout()` → removes role
- **Page Refresh**: AuthContext restores from localStorage

### Persistence Benefits
- User stays logged in after page refresh
- Role is maintained across sessions
- Can close and reopen browser without re-login

---

## 🎨 Navbar Display Logic

### User Module Pages
```
└─ Navbar shows: Home, What's New, Artworks, Artists, Auctions
└─ Role badge: "USER"
└─ Buttons: Switch Role, Logout
```

### Artist Module Pages
```
└─ Navbar shows: Dashboard, My Gallery, Upload, Manage
└─ Role badge: "ARTIST"
└─ Buttons: Switch Role, Logout
```

### Admin Module Pages
```
└─ Navbar shows: Dashboard, Users, Artists, Artworks
└─ Role badge: "ADMIN"
└─ Buttons: Switch Role, Logout
```

### Login/Register Pages
```
└─ Navbar hides search bar
└─ Limited navigation
└─ No role badge (no login yet)
```

---

## 🚨 Error Handling

### Redirect Chain Prevention
- ProtectedRoute prevents infinite redirects
- Compares roles only once
- Uses React Router's `replace` flag

### Known Redirects
```
Role Mismatch → User Dashboard (if role=user)
           → Artist Dashboard (if role=artist)
           → Admin Dashboard (if role=admin)

No Role → /  (Role Selection)

Unknown Route → / (catch-all)
```

---

## 🧪 Testing the Routing

### Test Case 1: User Access Only
1. Go to `/` → see Role Selection
2. Click "User" → go to `/user/login`
3. Click Log In → role set to "user" → redirected to `/user/home`
4. Click on navbar links → only User pages appear
5. Try accessing `/admin/dashboard` → redirects to `/user/home`
6. ✅ PASS

### Test Case 2: Artist Access Only
1. Go to `/` → see Role Selection
2. Click "Artist" → go to `/artist/login`
3. Click Log In → role set to "artist" → redirected to `/artist/dashboard`
4. Click on navbar links → only Artist pages appear
5. Try accessing `/user/artworks` → redirects to `/artist/dashboard`
6. ✅ PASS

### Test Case 3: Admin Access Only
1. Go to `/` → see Role Selection
2. Click "Admin" → go to `/admin/login`
3. Click Log In → role set to "admin" → redirected to `/admin/dashboard`
4. Click on navbar links → only Admin pages appear
5. Try accessing `/artist/gallery` → redirects to `/admin/dashboard`
6. ✅ PASS

### Test Case 4: Switch Role
1. Log in as User
2. Click "Switch Role" → clears role → go to `/`
3. See Role Selection again
4. Click "Artist" → go to `/artist/login`
5. Log in → role set to "artist" → redirected to `/artist/dashboard`
6. ✅ PASS

### Test Case 5: Logout
1. Log in to any module
2. Click "Logout" → clears role → go to `/`
3. See Role Selection again
4. ✅ PASS

---

## 📚 Component Integration

### AuthProvider Wrapper
```jsx
// In App.jsx
<AuthProvider>
  <div className="app">
    <Navbar />
    <Routes>...</Routes>
    <Footer />
  </div>
</AuthProvider>
```

### Using useAuth Hook
```jsx
// In any component
import { useAuth } from "../context/AuthContext";

const MyComponent = () => {
  const { userRole, login, logout } = useAuth();
  
  // Use userRole, login(), logout()
};
```

### Protecting Routes
```jsx
// In App.jsx
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

---

## 🎯 Key Features

✅ **Role-Based Access**: Only authorized users access their module  
✅ **Cross-Access Prevention**: Automatic redirect on unauthorized access  
✅ **Session Persistence**: Role stored in localStorage  
✅ **Clean Navigation**: Module-specific navbar for each role  
✅ **Easy Logout**: "Logout" and "Switch Role" buttons  
✅ **Protected Routes**: ProtectedRoute wrapper component  
✅ **Centralized Auth**: AuthContext manages all role logic  

---

## 🚀 Future Enhancements

- [ ] Add JWT token validation
- [ ] Implement actual backend authentication
- [ ] Add role-based API endpoints
- [ ] Implement refresh token logic
- [ ] Add session timeout
- [ ] Add remember-me functionality
- [ ] Enhance error messages

---

**Status**: ✅ Complete  
**Version**: 1.0  
**Last Updated**: March 28, 2026
