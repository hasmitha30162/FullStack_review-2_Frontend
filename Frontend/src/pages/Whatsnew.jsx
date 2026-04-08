import { useState, useEffect } from "react";
import "./WhatsNew.css";

const paintings = [
  {
    id: 1,
    title: "Golden Horizon",
    artist: "John Doe",
    price: "₹8,000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCYn4hRwJgZzCi1mvSvqHmGewYftTlRFEunA&s",
    description:
      "A stunning landscape capturing the beauty of sunset with golden reflections and emotional depth."
  },
  {
    id: 2,
    title: "Silent Ocean",
    artist: "Emma Watson",
    price: "₹10,500",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZPqfrFTsfD0i00x7CNr09FlzzfXNZdePw4w&s",
    description:
      "An expressive painting inspired by calm ocean waves and peaceful coastal vibes."
  },
  {
    id: 3,
    title: "Color Burst",
    artist: "Arjun Rao",
    price: "₹6,500",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
    description:
      "An abstract explosion of colors representing modern artistic freedom and imagination."
  },
  {
    id: 4,
    title: "Silent Screams",
    artist: "Michael Lee",
    price: "₹8,500",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTULYzr_laLoGciScK2A3wbS767VuUBkX7BqQ&s",
    description:
      "The minimalist style emphasizes the calm and grandeur of the ocean, creating the illusion of depth."
  } 
];

function WhatsNew() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === paintings.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // ⏳ change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentPainting = paintings[currentIndex];

  return (
    <div className="whatsnew-container">
      <div className="whatsnew-left">
        <img src={currentPainting.image} alt={currentPainting.title} />
      </div>

      <div className="whatsnew-right">
        <h2>{currentPainting.title}</h2>
        <h4>Artist: {currentPainting.artist}</h4>
        <p className="price">{currentPainting.price}</p>
        <p>{currentPainting.description}</p>
      </div>
    </div>
  );
}

export default WhatsNew;