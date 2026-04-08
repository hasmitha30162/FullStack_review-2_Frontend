import { useEffect, useState } from "react";
import "./MyGallery.css";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const MyGallery = () => {
  const { userId } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMyArtworks = async () => {
      if (!userId) {
        setMessage("Artist not logged in.");
        return;
      }

      try {
        setLoading(true);

        const res = await api.get(`/artworks/artist/${userId}`);
        setArtworks(res.data);
      } catch (err) {
        console.error("Fetch gallery error:", err);
        setMessage("Failed to load your artworks.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyArtworks();
  }, [userId]);

  if (loading) {
    return <div className="gallery-page"><h2>Loading your artworks...</h2></div>;
  }

  return (
    <div className="gallery-page">
      <h1>My Gallery</h1>
      <p className="gallery-subtitle">Your uploaded artworks</p>

      {message && <p>{message}</p>}

      <div className="gallery-grid">
        {artworks.length > 0 ? (
          artworks.map((art) => (
            <div key={art.id} className="gallery-card">
              <div className="gallery-image-wrapper">
                <img src={art.imageUrl} alt={art.title} />
              </div>

              <div className="gallery-info">
                <h3>{art.title}</h3>
                <p className="artwork-price">₹{art.price}</p>
                <p className="artwork-date">{art.description}</p>

                <div className="gallery-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No artworks uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyGallery;