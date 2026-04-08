import "./ArtistDashboard.css";

const ArtistDashboard = () => {
  const dashboardStats = [
    { label: "Total Artworks", value: "12", icon: "🎨" },
    { label: "Total Sales", value: "₹45,000", icon: "💰" },
    { label: "Active Listings", value: "8", icon: "📊" },
    { label: "Followers", value: "245", icon: "👥" },
  ];

  const recentWorks = [
    {
      id: 1,
      title: "Midnight Dreams",
      price: "₹5,000",
      date: "Mar 28, 2026",
      image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
    },
    {
      id: 2,
      title: "Ocean's Whisper",
      price: "₹7,500",
      date: "Mar 10, 2026",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimbMsIQ0c_Ym7wxUgxpa8He2F2b40-MDK9A&s",
    },
    {
      id: 3,
      title: "Ethereal Light",
      price: "₹4,200",
      date: "Dec 5, 2025",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
  ];

  return (
    <div className="artist-dashboard">
      <h1>Artist Dashboard</h1>

      <div className="stats-grid">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="recent-works-section">
        <h2>Recent Works</h2>
        <div className="recent-works-grid">
          {recentWorks.map((work) => (
            <div key={work.id} className="work-card">
              <img src={work.image} alt={work.title} />
              <h3>{work.title}</h3>
              <p className="work-price">{work.price}</p>
              <p className="work-date">{work.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;