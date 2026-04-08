import background from "../assets/backgroundofmain.png";
import "../App.css";

const Home = () => {
  const tags = [
          "🎨 Welcome to Artify",
          "✨ Explore Stunning Artworks",
          "🖌 Sell Your Masterpieces",
          "🛍 Buy Original Creations",
          "🌍 Discover Global Artists",
          "💎 Own Unique Creations",
          "🎭 Every Artwork Tells a Story"
  ];

  return (
    <div
      className="main-content"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="scroll-wrapper">
        <div className="scroll-track">
          {[...tags, ...tags].map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;