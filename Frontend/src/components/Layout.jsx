import Navbar from "./Navbar";
import Footer from "./Footer";
import bgImage from "../assets/backgroundofmain.png";
import "../App.css";

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main
        className="main-content"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;