import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Artworks.css";
import api from "../services/api";

function Artworks() {
  const { userId, userRole } = useAuth();
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [wishlistMessage, setWishlistMessage] = useState("");

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

  // Handle adding artwork to wishlist
  const handleWishlistClick = (artwork) => {
    if (!userRole) {
      setWishlistMessage("Please login to add wishlist");
      setTimeout(() => setWishlistMessage(""), 3000);
      return;
    }

    if (userRole !== "user") {
      setWishlistMessage("Only users can add items to wishlist");
      setTimeout(() => setWishlistMessage(""), 3000);
      return;
    }

    const wishlistKey = `artifyWishlist_${userId}`;
    let currentWishlist = [];

    try {
      const stored = localStorage.getItem(wishlistKey);
      if (stored) {
        currentWishlist = JSON.parse(stored);
      }

      // Check if artwork is already in wishlist
      const isAlreadyInWishlist = currentWishlist.some(item => item.id === artwork.id);

      if (isAlreadyInWishlist) {
        setWishlistMessage("Already in wishlist ⚠️");
        setTimeout(() => setWishlistMessage(""), 3000);
        return;
      }

      // Add artwork to wishlist
      currentWishlist.push(artwork);
      localStorage.setItem(wishlistKey, JSON.stringify(currentWishlist));

      setWishlistMessage("Wishlist added ❤️");
      setTimeout(() => setWishlistMessage(""), 3000);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setWishlistMessage("Failed to add to wishlist");
      setTimeout(() => setWishlistMessage(""), 3000);
    }
  };

  if (loading) {
    return <div className="artworks-page"><h2 className="page-title">Loading artworks...</h2></div>;
  }

  return (
    <div className="artworks-page">
      <h2 className="page-title">Explore Artworks</h2>

      {message && <p>{message}</p>}

      {/* Toast message */}
      {wishlistMessage && (
        <div className="wishlist-toast">
          {wishlistMessage}
        </div>
      )}

      <div className="artworks-grid">
        {artworks.length > 0 ? (
          artworks.map((art) => (
            <div key={art.id} className="art-card">
              <img src={art.imageUrl} alt={art.title} />
              <h3>{art.title}</h3>
              <p className="price">₹{art.price}</p>
              <p className="artist">Artist ID: {art.artistId}</p>

              <div className="card-buttons">
                <button
                  className="wishlist-btn"
                  onClick={() => handleWishlistClick(art)}
                >
                  ♡ Wishlist
                </button>
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