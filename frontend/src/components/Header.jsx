import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { AuthForm } from "./AuthForm";

export const Header = () => {
  const [showAuth, setShowAuth] = useState(false);
  const { isLoggedIn, userName, logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-left">
          <Link to="/" onClick={closeMenu}>
            <img src="/images/Kitchen.jpg" alt="Logo" className="nav-logo" />
          </Link>
          {isLoggedIn && userName && <span className="nav-greeting">Hej, {userName}!</span>}
        </div>

        <button
          className="nav-burger"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          type="button"
        >
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>

        <div id="nav-menu" className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/about" onClick={closeMenu}>
            About us
          </Link>
          <Link to="/why" onClick={closeMenu}>
            Eating Sustainable
          </Link>
          <Link to="/recipes" onClick={closeMenu}>
            Recipes
          </Link>

          {isLoggedIn && (
            <Link to="/favorites" onClick={closeMenu}>
              Favorites
            </Link>
          )}

          {isLoggedIn ? (
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button
              className="nav-button"
              onClick={() => {
                setShowAuth(true);
                closeMenu();
              }}
            >
              Login/Register
            </button>
          )}
        </div>
      </nav>

      {showAuth && (
        <AuthForm
          onClose={() => setShowAuth(false)}
          onSuccess={() => setShowAuth(false)}
        />
      )}
    </>
  );
};
