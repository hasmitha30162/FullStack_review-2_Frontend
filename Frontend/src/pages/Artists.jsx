import { useState } from "react";
import "./Artists.css";

const artistsData = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "John Doe specializes in abstract modern art with vibrant colors and emotional depth. His works explore human emotions and nature-inspired patterns."
  },
  {
    id: 2,
    name: "Emma Watson",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description:
      "Emma creates realistic landscape paintings inspired by mountains and oceans. Her artworks reflect calmness, beauty, and fine detailing."
  },
  {
    id: 3,
    name: "Arjun Rao",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    description:
      "Arjun focuses on cultural and traditional Indian themes. His paintings combine heritage elements with contemporary artistic styles."
  },
  {
    id: 4,
    name: "Banksy",
    image: "https://t4.ftcdn.net/jpg/07/61/57/77/360_F_761577759_kNs7KVw2JL8i9g19ZPB0FhuDydLQ0md6.jpg",
    description:
      "A mysterious and world-famous street artist from the UK. Banksy is known for powerful graffiti art that often carries social and political messages. His works appear on public walls and challenge topics like war, capitalism, and freedom. His identity remains unknown, which adds to his popularity."
  },
  {
    id: 5,
    name: "Yayoi Kusama",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZhf7Kahnih8siXzQQPF-0sETtwxHw48vfYw&s",
    description:
      " A Japanese contemporary artist famous for her colorful polka dots and infinity mirror rooms. Her art explores themes of mental health, repetition, and infinity. Kusama’s immersive exhibitions are extremely popular worldwide and attract millions of visitors."
  }
];

function Artists() {
  const [followed, setFollowed] = useState({});

  const toggleFollow = (id) => {
    setFollowed((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="artists-page">
      <h2 className="artists-title">Our Artists</h2>

      {artistsData.map((artist) => (
        <div key={artist.id} className="artist-row">

          {/* Follow Button */}
          <button
            className={`follow-btn ${followed[artist.id] ? "following" : ""}`}
            onClick={() => toggleFollow(artist.id)}
          >
            {followed[artist.id] ? "Following" : "Follow"}
          </button>

          {/* Image */}
          <img
            src={artist.image}
            alt={artist.name}
            className="artist-image"
          />

          {/* Info */}
          <div className="artist-info">
            <h3>{artist.name}</h3>
            <p>{artist.description}</p>
          </div>

        </div>
      ))}
    </div>
  );
}

export default Artists;