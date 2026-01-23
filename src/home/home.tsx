import React from "react";
import Nav from "../nav/nav";
import "./home.css"; // for styling hero section

function Home() {
  return (
    <div>
      <Nav />
      <div className="hero" style={{ 
        backgroundImage: "url('https://cdn.pixabay.com/photo/2024/07/19/09/46/ai-generated-8905906_1280.jpg')"
      }}>
        <h2>Our Mission</h2>
        <h1>WE MAKE QUALITY</h1>
        <p>Factory is an industrial site...</p>
      </div>
    </div>
  );
}

export default Home;
