import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Wishlist.css";

function Wishlist() {
  const { userId } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from localStorage
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const wishlistKey = `artifyWishlist_${userId}`;
        const storedWishlist = localStorage.getItem(wishlistKey);
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        }
      } catch (error) {
        console.error("Error loading wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadWishlist();
    } else {
      setLoading(false);
    }
  }, [userId]);

  // Remove artwork from wishlist
  const removeFromWishlist = (artworkId) => {
    const wishlistKey = `artifyWishlist_${userId}`;
    const updatedWishlist = wishlist.filter(art => art.id !== artworkId);
    setWishlist(updatedWishlist);
    localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
  };

  if (loading) {
    return <div className="wishlist-page"><h2 className="page-title">Loading wishlist...</h2></div>;
  }

  return (
    <div className="wishlist-page">
      <h2 className="page-title">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty</p>
          <p>Add some artworks to your wishlist from the Artworks page!</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((art) => (
            <div key={art.id} className="art-card">
              <img src={art.imageUrl} alt={art.title} />
              <h3>{art.title}</h3>
              <p className="price">₹{art.price}</p>
              <p className="artist">Artist ID: {art.artistId}</p>

              <div className="card-buttons">
                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(art.id)}
                >
                  Remove
                </button>
                <button className="buy-btn">Buy</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;