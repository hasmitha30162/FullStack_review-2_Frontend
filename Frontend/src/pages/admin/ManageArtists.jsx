import { useEffect, useState } from "react";
import "./ManageArtists.css";
import api from "../../services/api";

const ManageArtists = () => {
  const [artists, setArtists] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);

        const res = await api.get("/users/artists");
        setArtists(res.data);
      } catch (err) {
        console.error("Fetch artists error:", err);
        setMessage("Failed to load artists");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handleAction = (id, action) => {
    setMessage(`${action} feature not implemented for artist ID ${id}`);
  };

  if (loading) {
    return (
      <div className="manage-artists-page">
        <h1>Manage Artists</h1>
        <p className="page-subtitle">Loading artists...</p>
      </div>
    );
  }

  return (
    <div className="manage-artists-page">
      <h1>Manage Artists</h1>
      <p className="page-subtitle">Review and manage artist accounts</p>

      {message && <p>{message}</p>}

      <div className="table-container">
        {artists.length > 0 ? (
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
              {artists.map((artist) => (
                <tr key={artist.id}>
                  <td>{artist.id}</td>
                  <td className="name-cell">{artist.name}</td>
                  <td>{artist.email}</td>
                  <td>{artist.role}</td>
                  <td>
                    <span className="artist-status approved">
                      {artist.verified ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button
                      className="approve-btn"
                      onClick={() => handleAction(artist.id, "Approve")}
                    >
                      ✓ Approve
                    </button>

                    <button
                      className="block-btn"
                      onClick={() => handleAction(artist.id, "Block")}
                    >
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No artists found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageArtists;