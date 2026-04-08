import { useEffect, useState } from "react";
import "./AdminManageArtworks.css";
import api from "../../services/api";

const AdminManageArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);

        const res = await api.get("/artworks");
        setArtworks(res.data);
      } catch (err) {
        console.error("Fetch artworks error:", err);
        setMessage("Failed to load artworks");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this artwork?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/artworks/${id}`);
      setArtworks((prev) => prev.filter((art) => art.id !== id));
      setMessage("Artwork deleted");
    } catch (err) {
      console.error(err);
      setMessage("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="admin-manage-artworks-page">
        <h1>Manage Artworks</h1>
        <p className="page-subtitle">Loading artworks...</p>
      </div>
    );
  }

  return (
    <div className="admin-manage-artworks-page">
      <h1>Manage Artworks</h1>
      <p className="page-subtitle">Review and moderate all platform artworks</p>

      {message && <p>{message}</p>}

      <div className="artworks-table-container">
        {artworks.length > 0 ? (
          <table className="admin-manage-table">
            <thead>
              <tr>
                <th>Artwork</th>
                <th>Title</th>
                <th>Artist ID</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {artworks.map((art) => (
                <tr key={art.id}>
                  <td>
                    <img
                      className="artwork-thumbnail"
                      src={art.imageUrl}
                      alt={art.title}
                    />
                  </td>
                  <td>{art.title}</td>
                  <td>{art.artistId}</td>
                  <td>₹{art.price}</td>
                  <td>{art.description}</td>
                  <td className="action-cell">
                    <button className="view-artwork-btn">View</button>

                    <button
                      className="delete-artwork-btn"
                      onClick={() => handleDelete(art.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No artworks found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminManageArtworks;