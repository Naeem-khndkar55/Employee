import React from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar/Navbar";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="container">
          <h2 className="hero-text"> Employee management system</h2>
          <p className="description">
            A place to Manage all the Employee ,Its Easy to Manage From here
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
