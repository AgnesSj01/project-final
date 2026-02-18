//Startsida
import { Link } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { AuthForm } from "../components/AuthForm";

export const Home = () => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <header className="header">
        <img
          src="/images/wheat2.jpg"
          alt="Wheat field"
          className="hero-video"
        />

        <div className="hero-content">
          <h1 className="Title">Welcome to Seasoned</h1>
          <p>
            Here you can learn about sustainable food practices and discover
            seasonal recipes that support more sustainable eating.
          </p>
        </div>
      </header>

      <div className="home-cards">
        <Link to="/recipes" className="home-card">
          <MdRestaurantMenu className="card-icon" />
          <h2>Find Recipes</h2>
          <p>Find recipes instantly — no login required</p>
        </Link>

        <button
          className="home-card"
          onClick={() => setShowAuth(true)}
          type="button"
        >
          <FaUserCircle className="card-icon" />
          <h2>Log in/Register</h2>
          <p>Log in to save your favourite recipes and revisit them later.</p>
        </button>
      </div>
      {showAuth && (
        <AuthForm
          onClose={() => setShowAuth(false)}
          onSuccess={() => setShowAuth(false)}
        />
      )}
    </>
  );
};
