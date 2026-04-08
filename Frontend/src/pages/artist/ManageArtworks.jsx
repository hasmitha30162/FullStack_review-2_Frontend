import { useEffect, useState } from "react";
import "./ManageArtworks.css";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const ManageArtworks = () => {
  const { userId } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMyArtworks = async () => {
      if (!userId) {
        setMessage("Artist not logged in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setMessage("");

        const res = await api.get(`/artworks/artist/${userId}`);
        setArtworks(res.data);
      } catch (err) {
        console.error("Manage artworks fetch error:", err);
        setMessage("Failed to load your artworks.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyArtworks();
  }, [userId]);

  const handleDelete = async (artworkId) => {
    const confirmed = window.confirm("Are you sure you want to delete this artwork?");
    if (!confirmed) return;

    try {
      const res = await api.delete(`/artworks/${artworkId}`);
      setMessage(res.data || "Artwork deleted successfully.");

      setArtworks((prev) => prev.filter((art) => art.id !== artworkId));
    } catch (err) {
      console.error("Delete artwork error:", err);
      setMessage(err.response?.data || "Failed to delete artwork.");
    }
  };

  const handleEdit = (artworkId) => {
    setMessage(`Edit feature for artwork ID ${artworkId} is not connected yet.`);
  };

  if (loading) {
    return (
      <div className="manage-artworks-page">
        <h1>Manage Artworks</h1>
        <p className="page-subtitle">Loading your artworks...</p>
      </div>
    );
  }

  return (
    <div className="manage-artworks-page">
      <h1>Manage Artworks</h1>
      <p className="page-subtitle">View, edit, and manage all your artworks</p>

      {message && <p>{message}</p>}

      <div className="artworks-table-container">
        {artworks.length > 0 ? (
          <table className="artworks-table">
            <thead>
              <tr>
                <th>Artwork</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Artist ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {artworks.map((artwork) => (
                <tr key={artwork.id}>
                  <td>
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="thumbnail"
                    />
                  </td>
                  <td>{artwork.title}</td>
                  <td className="price-cell">₹{artwork.price}</td>
                  <td>{artwork.description}</td>
                  <td>{artwork.artistId}</td>
                  <td className="action-cell">
                    <button
                      className="edit-action-btn"
                      onClick={() => handleEdit(artwork.id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-action-btn"
                      onClick={() => handleDelete(artwork.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No artworks uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ManageArtworks;