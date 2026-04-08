# Artify Frontend - Quick Reference Guide

## 🎯 Problem & Solution

### ❌ Before (Broken)
```
User tries: /admin/page         → ❌ Opens Admin page (wrong!)
         → /home                → ❌ Not protected
         → /login               → ❌ Unclear which role
Result: Cross-module access allowed
```

### ✅ After (Fixed)
```
User tries: /user/home          → ✅ Opens (has role="user")
         → /admin/dashboard     → ✅ Redirects to /user/home (unauthorized)
         → /artist/gallery      → ✅ Redirects to /user/home (unauthorized)
Result: Only access your module
```

---

## 📋 What Changed

### New Files (2)
```
src/context/AuthContext.jsx          → Manages user role globally
src/components/ProtectedRoute.jsx    → Guards routes by role
```

### Updated Files (8)
```
src/App.jsx                          → Proper route structure + AuthProvider
src/components/Navbar.jsx            → Dynamic role-based navbar
src/components/Navbar.css            → New button styles
src/pages/Login.jsx                  → Sets role on login
src/pages/artist/ArtistLogin.jsx     → Sets role on login
src/pages/admin/AdminLogin.jsx       → Sets role on login
src/pages/common/RoleSelection.jsx   → Updated redirects
src/pages/Register.jsx               → Fixed links
```

---

## 🗺️ Route Map

### User Routes (`/user/*`)
```
/user/login      → Login page
/user/home       → Dashboard
/user/artworks   → Browse artworks
/user/artists    → Browse artists
/user/whatsnew   → What's new
/user/auctions   → Auctions
```

### Artist Routes (`/artist/*`)
```
/artist/login    → Login page
/artist/dashboard → Dashboard
/artist/gallery  → View gallery
/artist/upload   → Upload artwork
/artist/manage   → Manage artworks
```

### Admin Routes (`/admin/*`)
```
/admin/login     → Login page
/admin/dashboard → Dashboard
/admin/users     → Manage users
/admin/artists   → Manage artists
/admin/artworks  → Manage artworks
```

---

## 🔐 How It Works

### Step 1: Select Role
```
User clicks on home page
↓
Shows role selection: User / Artist / Admin
↓
User selects "User"
```

### Step 2: Login
```
Redirected to /user/login
↓
User enters credentials
↓
Click "Log In"
↓
login("user") called
↓
localStorage.userRole = "user"
```

### Step 3: Access Protected Page
```
login() successful
↓
Redirects to /user/home
↓
Wrapped in: <ProtectedRoute requiredRole="user">
↓
✅ Role matches → Shows page
```

### Step 4: Try to Access Other Module
```
User tries to access /admin/dashboard
↓
Wrapped in: <ProtectedRoute requiredRole="admin">
↓
userRole = "user", requiredRole = "admin"
↓
❌ Roles don't match
↓
Redirects to /user/home
```

### Step 5: Role Persists
```
User refreshes page (F5)
↓
AuthContext checks localStorage
↓
Finds: localStorage.userRole = "user"
↓
✅ User stays logged in
```

### Step 6: Logout
```
User clicks "Logout"
↓
logout() called
↓
localStorage.userRole deleted
↓
userRole = null
↓
Redirects to /
```

---

## 🧬 Component Architecture

```
App.jsx
│
├── AuthProvider (Wrapper)
│   ├── userRole state
│   ├── login() function
│   └── logout() function
│
├── Navbar
│   ├── Uses useAuth() hook
│   ├── Shows role badge
│   ├── Shows role-specific links
│   └── Logout button
│
└── Routes
    ├── PublicRoute (Role Selection, Login)
    │   ├── No ProtectedRoute wrapper
    │   └── Accessible to everyone
    │
    └── ProtectedRoute (Dashboard, Pages)
        ├── Requires role match
        ├── Verifies userRole
        └── Redirects on mismatch
```

---

## 🔍 Code Examples

### Using Auth in Components
```javascript
import { useAuth } from "../context/AuthContext";

export function MyComponent() {
  const { userRole, login, logout } = useAuth();
  
  // Use userRole to display content
  return (
    <div>
      {userRole && <p>Logged in as: {userRole}</p>}
    </div>
  );
}
```

### Protected Route Setup
```javascript
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

### Login Handler
```javascript
const handleLogin = (e) => {
  e.preventDefault();
  login("user");                    // Set role
  navigate("/user/home");           // Redirect to home
};
```

---

## 🎮 Usage Flow

| Action | Result | Redirect |
|--------|--------|----------|
| Open app | Show Role Selection | `/` |
| Click "User" | Go to login | `/user/login` |
| Click "Log In" | Set role, navigate | `/user/home` ✅ |
| Browse pages | Show user links | `/user/*` ✅ |
| Try `/admin/*` | Role mismatch | `/user/home` ✅ |
| Click "Switch Role" | Clear role | `/` |
| Click "Logout" | Clear role | `/` |
| Refresh page | Restore from localStorage | Same page ✅ |

---

## ✅ Verification Checklist

### Quick Test (5 minutes)
- [ ] Open app → see Role Selection
- [ ] Click "User" → see login page
- [ ] Click "Log In" → redirected to `/user/home`
- [ ] See User navbar links
- [ ] Try `/admin/dashboard` → redirected back
- [ ] Click "Switch Role" → go to Role Selection
- [ ] Refresh page → should stay logged in

---

## 🚨 Common Issues & Solutions

### Issue: Page not protected
**Solution**: Wrap with `<ProtectedRoute requiredRole="...">` in App.jsx

### Issue: Can access admin page as user
**Solution**: Check ProtectedRoute is correctly wrapping the route

### Issue: Role not persisting after refresh
**Solution**: Ensure localStorage is enabled in browser

### Issue: Logout not working
**Solution**: Check `logout()` is being called in Navbar button

---

## 📱 Testing Steps

### Browser Console
```javascript
// Check logged in user
localStorage.getItem("userRole")    // Returns: "user", "artist", "admin", or null

// Manually clear
localStorage.removeItem("userRole")

// Check full storage
console.log(localStorage)
```

### Test URLs
```
✅ Visit: http://localhost:5173/
✅ Visit: http://localhost:5173/user/login
✅ Visit: http://localhost:5173/artist/dashboard (without login → redirects)
✅ Visit: http://localhost:5173/admin/users (without login → redirects)
```

---

## 📚 Files Reference

| File | Purpose | Type |
|------|---------|------|
| AuthContext.jsx | Auth state management | Context |
| ProtectedRoute.jsx | Route protection | Component |
| App.jsx | Route configuration | Main |
| Navbar.jsx | Navigation display | Component |
| Login.jsx | User auth | Page |
| ArtistLogin.jsx | Artist auth | Page |
| AdminLogin.jsx | Admin auth | Page |

---

## 🎯 Key Features

✅ Role-based access control  
✅ Session persistence  
✅ Smart redirects  
✅ Dynamic navbar  
✅ Cross-module prevention  
✅ Clean code architecture  

---

## 🔗 Related Docs

- **ROUTING_GUIDE.md** - Detailed routing documentation
- **ROUTING_FIX_SUMMARY.md** - Complete implementation summary
- **EXTENSION_GUIDE.md** - Module structure (older docs)
- **IMPLEMENTATION_VERIFICATION.md** - Testing checklist

---

**Quick Start**: Go to [http://localhost:5173](http://localhost:5173) and test! 🚀
