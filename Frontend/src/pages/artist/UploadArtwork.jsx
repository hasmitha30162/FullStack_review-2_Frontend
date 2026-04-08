import { useState } from "react";
import "./UploadArtwork.css";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const UploadArtwork = () => {
  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("Artist not logged in.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/artworks/upload", {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        imageUrl: formData.imageUrl,
        artistId: Number(userId),
      });

      setMessage("Artwork uploaded successfully!");
      console.log("Uploaded artwork:", res.data);

      setFormData({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error("Upload error:", err);
      setMessage(err.response?.data || "Failed to upload artwork.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      imageUrl: "",
    });
    setMessage("");
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1>Upload Artwork</h1>
        <p className="upload-subtitle">Share your masterpiece with Artify community</p>

        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Artwork Image URL *</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="Paste image URL here"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Artwork Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter artwork title"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your artwork (techniques, inspiration, etc.)"
              className="form-textarea"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="form-input"
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="upload-btn" disabled={loading}>
              {loading ? "Uploading..." : "Upload Artwork"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </form>

        {message && <p style={{ marginTop: "15px" }}>{message}</p>}
      </div>
    </div>
  );
};

export default UploadArtwork;