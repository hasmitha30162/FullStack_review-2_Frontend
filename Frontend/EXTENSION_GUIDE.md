# Artify Frontend - Extended Modules Documentation

## Overview
The Artify frontend has been successfully extended with two new modules: **Artist Module** and **Admin Module**. The application now includes a role-based navigation system with a landing page for users to select their role.

---

## Project Structure

```
src/
├── pages/
│   ├── common/                 # Shared pages
│   │   ├── RoleSelection.jsx   # Landing page - Role selector
│   │   └── RoleSelection.css
│   │
│   ├── artist/                 # Artist Module
│   │   ├── ArtistLogin.jsx
│   │   ├── ArtistRegister.jsx
│   │   ├── ArtistAuth.css
│   │   ├── ArtistDashboard.jsx      # Dashboard with stats
│   │   ├── ArtistDashboard.css
│   │   ├── MyGallery.jsx            # View artist's artworks
│   │   ├── MyGallery.css
│   │   ├── UploadArtwork.jsx        # Upload new artwork form
│   │   ├── UploadArtwork.css
│   │   ├── ManageArtworks.jsx       # Manage (edit/delete) artworks
│   │   └── ManageArtworks.css
│   │
│   ├── admin/                  # Admin Module
│   │   ├── AdminLogin.jsx
│   │   ├── AdminAuth.css
│   │   ├── AdminDashboard.jsx       # Dashboard with platform stats
│   │   ├── AdminDashboard.css
│   │   ├── ManageUsers.jsx          # Manage user accounts
│   │   ├── ManageUsers.css
│   │   ├── ManageArtists.jsx        # Manage artist accounts
│   │   ├── ManageArtists.css
│   │   ├── AdminManageArtworks.jsx  # Moderate artworks
│   │   └── AdminManageArtworks.css
│   │
│   ├── Home.jsx               # User Home
│   ├── Login.jsx              # User Login
│   ├── Register.jsx           # User Register
│   ├── Artworks.jsx           # Browse artworks
│   ├── Artists.jsx            # Browse artists
│   ├── Whatsnew.jsx           # What's new
│   ├── Auctions.jsx           # Auctions
│   └── ...other files
│
├── components/
│   ├── Navbar.jsx             # Updated with role-based navigation
│   ├── Navbar.css             # Enhanced with role-specific styles
│   ├── Layout.jsx
│   └── Footer.jsx
│
└── App.jsx                    # Updated with all new routes
```

---

## Routes & Navigation

### Landing Page (Role Selection)
- **Route**: `/`
- **Component**: `RoleSelection`
- Allows users to select their role: User, Artist, or Admin
- Redirects to appropriate login page based on selection

### User Module (Existing - Unchanged)
- `/home` → Home
- `/login` → User Login
- `/register` → User Register
- `/artworks` → Browse Artworks
- `/artists` → Browse Artists
- `/whatsnew` → What's New
- `/auctions` → Auctions

### Artist Module
- `/artist/login` → Artist Login
- `/artist/register` → Artist Registration
- `/artist/dashboard` → Artist Dashboard (Stats + Recent Works)
- `/artist/gallery` → My Gallery (All Artist's Artworks)
- `/artist/upload` → Upload Artwork Form
- `/artist/manage` → Manage Artworks (Edit/Delete Table)

### Admin Module
- `/admin/login` → Admin Login (Protected)
- `/admin/dashboard` → Admin Dashboard (Platform Stats)
- `/admin/users` → Manage Users (View/Block Users)
- `/admin/artists` → Manage Artists (Approve/Block/Review Artists)
- `/admin/artworks` → Manage Artworks (View/Delete/Flag Artworks)

---

## Features

### 1. Role Selection Page
- **Path**: `src/pages/common/RoleSelection.jsx`
- Beautiful card-based interface for role selection
- Three options: User, Artist, Admin
- Redirect to appropriate login/dashboard
- Responsive design with hover effects

### 2. Artist Module

#### Artist Dashboard
- **Path**: `src/pages/artist/ArtistDashboard.jsx`
- Displays 4 stat cards:
  - Total Artworks
  - Total Sales
  - Active Listings
  - Followers
- Shows recent works grid
- Uses dummy data (ready for backend integration)

#### My Gallery
- **Path**: `src/pages/artist/MyGallery.jsx`
- Grid view of artist's artworks
- Sales badge on each artwork
- Edit/Delete buttons per artwork
- Responsive grid layout

#### Upload Artwork
- **Path**: `src/pages/artist/UploadArtwork.jsx`
- Form with:
  - Image upload with drag-and-drop style
  - Artwork title input
  - Description textarea
  - Price input (₹)
- Upload and Clear buttons
- Form validation ready

#### Manage Artworks
- **Path**: `src/pages/artist/ManageArtworks.jsx`
- Table view of all artist artworks
- Columns:
  - Artwork thumbnail
  - Title
  - Price
  - Upload date
  - Status (Active/Sold/Draft)
  - Edit/Delete actions
- Interactive with hover effects

### 3. Admin Module

#### Admin Dashboard
- **Path**: `src/pages/admin/AdminDashboard.jsx`
- 4 colored stat cards:
  - Total Users
  - Total Artists
  - Total Artworks
  - Total Sales
- Recent users table
- Status badges (Active/Inactive)
- Purple color scheme for admin

#### Manage Users
- **Path**: `src/pages/admin/ManageUsers.jsx`
- User management table with:
  - User ID, Name, Email
  - Join date
  - Number of purchases
  - Status (Active/Inactive/Blocked)
  - View/Block action buttons
- Sortable and manageable

#### Manage Artists
- **Path**: `src/pages/admin/ManageArtists.jsx`
- Artist management table with:
  - Artist name and email
  - Join date
  - Number of artworks
  - Status (Approved/Pending/Blocked)
  - Context-aware actions:
    - Pending: Approve/Reject buttons
    - Approved: Block button
    - Blocked: Unblock button

#### Manage Artworks
- **Path**: `src/pages/admin/AdminManageArtworks.jsx`  
- Artwork moderation table with:
  - Artwork thumbnail
  - Title and artist name
  - Price
  - Upload date
  - Status (Active/Flagged/Under Review)
  - View/Delete action buttons

---

## Design & Styling

### Color Scheme
- **User Module**: Tan/Brown (`#c68375`, `#ebc4b2`)
- **Artist Module**: Continues User colors (consistent)
- **Admin Module**: Purple (`#667eea`, `#764ba2`)

### Typography
- **Font Family**: Arial, Helvetica, sans-serif
- **Heading Size**: 24px - 32px
- **Body Text**: 14px
- **Button Padding**: 8px-14px depending on context

### Components Used
- Card layouts for dashboard stats
- Grid layouts for image galleries (responsive)
- Table layouts for data management
- Form inputs with focus states
- Buttons with hover effects
- Status badges with color coding

### Responsive Design
- All components are responsive
- Mobile breakpoints: 768px, 1024px
- Adjusted spacing and font sizes for smaller screens
- Flexible grid layouts

---

## Dummy Data

All pages include dummy/static data:
- **Users**: 6 sample users with email, join date, purchase count
- **Artists**: 6 sample artists with artwork counts and approval status
- **Artworks**: 9 sample artworks with prices and artist names
- **Dashboard Stats**: Hardcoded numbers (ready for API integration)

---

## Key Updates

### Updated Files
1. **App.jsx** - Added all new routes and imports
2. **Navbar.jsx** - Dynamic navigation based on current role
3. **Navbar.css** - Enhanced with role-specific styling

### New Files Created
- **9 Artist Module files** (3 pages + login/register)
- **9 Admin Module files** (4 pages + login)
- **2 Common files** (Role Selection page)

---

## Backend Integration Points

The frontend is ready for backend integration at:

1. **Authentication**
   - Replace form submissions in Login/Register pages
   - Implement JWT token handling

2. **Data Loading**
   - Replace dummy data with API calls
   - Use useEffect and useState for dynamic data

3. **API Endpoints Needed**
   - `/api/auth/artist/login` - Artist login
   - `/api/auth/admin/login` - Admin login
   - `/api/artist/artworks` - Get artist's artworks
   - `/api/artist/artworks/upload` - Upload new artwork
   - `/api/admin/users` - Get all users
   - `/api/admin/artists` - Get all artists
   - `/api/admin/artworks` - Get all artworks (moderation)

---

## How to Use

### Navigate to Role Selection
1. Open the app at `/` (root path)
2. Click role card to select User/Artist/Admin
3. Redirected to respective login page

### Artist Workflow
1. Login as Artist at `/artist/login`
2. Access `Artist Dashboard` via navbar
3. View gallery in `My Gallery`
4. Upload new artworks in `Upload` section
5. Manage existing artworks in `Manage` section

### Admin Workflow
1. Login as Admin at `/admin/login`
2. View analytics on `Admin Dashboard`
3. Manage user accounts in `Users` section
4. Review/approve artists in `Artists` section
5. Moderate artworks in `Artworks` section

---

## Next Steps

1. **Connect Backend APIs**: Replace dummy data with real API calls
2. **Implement Authentication**: Add JWT/session management
3. **State Management**: Consider Redux/Context API for role state
4. **Error Handling**: Add error boundaries and validation
5. **Loading States**: Add spinners during data fetching
6. **Protected Routes**: Implement route guards for admin/artist pages
7. **User Preferences**: Add profile and settings pages

---

## Files Summary

| Module | Files | Purpose |
|--------|-------|---------|
| Common | 2 | Role selection landing page |
| Artist | 11 | Artist auth, dashboard, gallery, upload, manage |
| Admin | 10 | Admin auth, dashboard, user/artist/artwork management |
| Updated | 3 | App routing and navbar enhancement |
| **Total** | **26** | Complete module extension |

---

## Testing Checklist

- [ ] Role selection page loads correctly
- [ ] Navigation between roles works
- [ ] Artist pages display dummy data
- [ ] Admin pages display dummy data
- [ ] Navbar changes based on current role
- [ ] All buttons are clickable
- [ ] Forms are functional (client-side)
- [ ] Responsive design on mobile
- [ ] CSS styling is consistent
- [ ] No console errors

---

**Version**: 1.0  
**Last Updated**: 2024  
**Status**: Ready for Backend Integration
