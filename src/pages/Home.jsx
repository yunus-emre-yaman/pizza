import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import pizzaImage from "../assets/pizza-banner.png";

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="brand">Teknolojik Yemekler<br />Chef Yunus Emre</h2>
      <div className="slogan-box">
        <h1 className="slogan">KOD ACIKTIRIR<br />PİZZA, DOYURUR</h1>
        <Link to="/order">
          <button className="order-button">ACIKTIM</button>
        </Link>
      </div>
      <img src={pizzaImage} alt="pizza" className="pizza-img" />
    </div>
  );
};

export default Home;
