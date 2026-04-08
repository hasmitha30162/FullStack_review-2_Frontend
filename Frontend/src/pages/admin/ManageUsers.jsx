import { useEffect, useState } from "react";
import "./ManageUsers.css";
import api from "../../services/api";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        // fetch only USER role
        const res = await api.get("/users/only-users");
        setUsers(res.data);
      } catch (err) {
        console.error("Fetch users error:", err);
        setMessage("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = (userId) => {
    setMessage(`Block feature not implemented yet for user ID ${userId}`);
  };

  const handleView = (userId) => {
    setMessage(`View feature not implemented yet for user ID ${userId}`);
  };

  if (loading) {
    return (
      <div className="manage-users-page">
        <h1>Manage Users</h1>
        <p className="page-subtitle">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="manage-users-page">
      <h1>Manage Users</h1>
      <p className="page-subtitle">View and manage all platform users</p>

      {message && <p>{message}</p>}

      <div className="table-container">
        {users.length > 0 ? (
          <table className="manage-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td className="name-cell">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className="status-badge active">
                      {user.verified ? "Active" : "Not Verified"}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button
                      className="view-btn"
                      onClick={() => handleView(user.id)}
                    >
                      View
                    </button>

                    <button
                      className="block-btn"
                      onClick={() => handleBlock(user.id)}
                    >
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;