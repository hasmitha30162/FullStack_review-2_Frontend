import { useEffect, useState } from "react";
import "./Artworks.css";
import api from "../services/api";

function Artworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const res = await api.get("/artworks");
        setArtworks(res.data);
      } catch (err) {
        console.error("Fetch artworks error:", err);
        setMessage("Failed to load artworks.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return <div className="artworks-page"><h2 className="page-title">Loading artworks...</h2></div>;
  }

  return (
    <div className="artworks-page">
      <h2 className="page-title">Explore Artworks</h2>

      {message && <p>{message}</p>}

      <div className="artworks-grid">
        {artworks.length > 0 ? (
          artworks.map((art) => (
            <div key={art.id} className="art-card">
              <img src={art.imageUrl} alt={art.title} />
              <h3>{art.title}</h3>
              <p className="price">₹{art.price}</p>
              <p className="artist">Artist ID: {art.artistId}</p>

              <div className="card-buttons">
                <button className="wishlist-btn">♡ Wishlist</button>
                <button className="buy-btn">Buy</button>
              </div>
            </div>
          ))
        ) : (
          <p>No artworks available.</p>
        )}
      </div>
    </div>
  );
}

export default Artworks;