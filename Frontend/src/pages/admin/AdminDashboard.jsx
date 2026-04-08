import "./AdminDashboard.css";

const AdminDashboard = () => {
  const dashboardStats = [
    { label: "Total Users", value: "1,245", icon: "👥", color: "#667eea" },
    { label: "Total Artists", value: "342", icon: "🎨", color: "#764ba2" },
    { label: "Total Artworks", value: "4,521", icon: "🖼️", color: "#f093fb" },
    { label: "Total Sales", value: "₹12,50,000", icon: "💰", color: "#4ba3c1" },
  ];

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", joinDate: "Mar 15, 2024", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", joinDate: "Mar 10, 2024", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", joinDate: "Mar 5, 2024", status: "Inactive" },
  ];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p className="dashboard-subtitle">Platform Overview and Management</p>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="admin-stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="admin-stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
            <div className="admin-stat-label">{stat.label}</div>
            <div className="admin-stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Users Section */}
      <div className="recent-users-section">
        <h2>Recent Users</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.joinDate}</td>
                <td>
                  <span className={`status-label ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
