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
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/videos/wheat.mp4" type="video/mp4" />
          Din webbläsare stödjer inte video-taggen.
        </video>

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
          <h3>Find Recipes</h3>
          <p>Find recipes instantly — no login required</p>
        </Link>

        <div
          className="home-card"
          onClick={() => setShowAuth(true)}
          style={{ cursor: "pointer" }}
        >
          <FaUserCircle className="card-icon" />
          <h3>Log in/Register</h3>
          <p>Log in to save your favourite recipes and revisit them later.</p>
        </div>
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
